export namespace main {
	
	export class DownloadOptions {
	    url: string;
	    audioOnly: boolean;
	    quality: string;
	    outputDir: string;
	
	    static createFrom(source: any = {}) {
	        return new DownloadOptions(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.url = source["url"];
	        this.audioOnly = source["audioOnly"];
	        this.quality = source["quality"];
	        this.outputDir = source["outputDir"];
	    }
	}
	export class DownloadResult {
	    success: boolean;
	    filename: string;
	    error: string;
	
	    static createFrom(source: any = {}) {
	        return new DownloadResult(source);
	    }
	
	    constructor(source: any = {}) {
	        if ('string' === typeof source) source = JSON.parse(source);
	        this.success = source["success"];
	        this.filename = source["filename"];
	        this.error = source["error"];
	    }
	}

}

