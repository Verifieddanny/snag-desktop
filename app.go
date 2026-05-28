package main

import (
	"context"
	"net/url"
	"os"
	"os/exec"
	"strings"

	"golang.org/x/text/cases"
	"golang.org/x/text/language"
)

// App struct
type App struct {
	ctx context.Context
}

type DownloadOptions struct {
	URL       string `json:"url"`
	AudioOnly bool   `json:"audioOnly"`
	Quality   string `json:"quality"`
	OutputDir string `json:"outputDir"`
}

type DownloadResult struct {
	Success  bool   `json:"success"`
	Filename string `json:"filename"`
	Error    string `json:"error"`
}

// NewApp creates a new App application struct
func NewApp() *App {
	return &App{}
}

// startup is called when the app starts. The context is saved
// so we can call the runtime methods
func (a *App) startup(ctx context.Context) {
	a.ctx = ctx
}

func (a *App) DetectPlatform(rawURL string) string {
	switch {
	case strings.Contains(rawURL, "youtube.com") || strings.Contains(rawURL, "youtu.be"):
		return "YouTube"
	case strings.Contains(rawURL, "tiktok.com"):
		return "TikTok"
	case strings.Contains(rawURL, "instagram.com"):
		return "Instagram"
	case strings.Contains(rawURL, "x.com") || strings.Contains(rawURL, "twitter.com"):
		return "X (Twitter)"
	case strings.Contains(rawURL, "facebook.com") || strings.Contains(rawURL, "fb.watch"):
		return "Facebook"
	case strings.Contains(rawURL, "reddit.com"):
		return "Reddit"
	default:
		u, err := url.Parse(rawURL)
		if err != nil || u.Host == "" {
			return "Others"
		}

		host := strings.TrimPrefix(u.Host, "www.")
		parts := strings.Split(host, ".")

		if len(parts) > 0 {
			caser := cases.Title(language.English)
			return caser.String(parts[0])
		}

		return "Others"
	}
}

// Greet returns a greeting for the given name
func (a *App) Download(opts DownloadOptions) DownloadResult {
	if opts.OutputDir == "" {
		opts.OutputDir = "~/Downloads/Snag"
	}

	args := []string{}

	if opts.AudioOnly {
		args = append(args, "-x", "--audio-format", "mp3")
	} else {
		var format string
		switch opts.Quality {
		case "1080":
			format = "bestvideo[height<=1080]+bestaudio/best[height<=1080]"
		case "720":
			format = "bestvideo[height<=720]+bestaudio/best[height<=720]"
		case "480":
			format = "bestvideo[height<=480]+bestaudio/best[height<=480]"
		case "360":
			format = "bestvideo[height<=360]+bestaudio/best[height<=360]"
		default:
			format = "bestvideo+bestaudio/best"
		}
		args = append(args, "-f", format, "--merge-output-format", "mp4", "--postprocessor-args", "ffmpeg:-c:v libx264 -c:a aac")
	}

	outputPath := opts.OutputDir + "/%(title)s.%(ext)s"
	args = append(args, "--no-warnings", "--newline", "--print", "after_move:filepath", "--output", outputPath, opts.URL)

	ytdlp := findBinary("yt-dlp")

	cmd := exec.Command(ytdlp, args...)
	output, err := cmd.CombinedOutput()

	if err != nil {
		return DownloadResult{
			Success: false,
			Error:   friendlyError(string(output)),
		}
	}

	lines := strings.Split(strings.TrimSpace(string(output)), "\n")
	filename := lines[len(lines)-1]

	return DownloadResult{
		Success:  true,
		Filename: filename,
	}

}

func findBinary(name string) string {
	path, err := exec.LookPath(name)
	if err == nil {
		return path
	}

	locations := []string{
		"/opt/homebrew/bin/" + name,
		"/usr/local/bin/" + name,
	}
	for _, loc := range locations {
		if _, err := os.Stat(loc); err == nil {
			return loc
		}
	}
	return ""
}

func (a *App) CheckDependencies() map[string]bool {
	deps := map[string]bool{}
	deps["yt-dlp"] = findBinary("yt-dlp") != ""
	deps["ffmpeg"] = findBinary("ffmpeg") != ""
	return deps
}

func friendlyError(rawErr string) string {
	switch {
	case strings.Contains(rawErr, "extracted extension") && strings.Contains(rawErr, "unusual"):
		return "This platform isn't fully supported yet. Try a different link."
	case strings.Contains(rawErr, "Video unavailable"):
		return "This video is unavailable or private."
	case strings.Contains(rawErr, "Unsupported URL"):
		return "This URL isn't supported. Try a link from YouTube, TikTok, Instagram, or X."
	case strings.Contains(rawErr, "HTTP Error 403"):
		return "Access denied. This content may be private or region-locked."
	case strings.Contains(rawErr, "HTTP Error 404"):
		return "Content not found. The link may be broken or expired."
	default:
		return "Download failed. Please check the URL and try again."
	}
}
