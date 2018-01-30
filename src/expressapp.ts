/**
 * This file is part of BitBlab.
 *
 * BitBlab is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * BitBlab is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with BitBlab.  If not, see <http://www.gnu.org/licenses/>.
 *
 *************************************************************************
 *
 * This file contains the ExpressApp class that is used to create the main
 * web server used by the application.
 *
 * Note: portions of this file are based on https://blog.risingstack.com/building-a-node-js-app-with-typescript-tutorial/
 *
 */

/* Constants */
const PORT: number = 3000;
const PUBLIC_FOLDER: string = "public";
const MORGAN_MODE: string = "dev";

/* Imports */
import * as express        from "express";
import * as morgan         from "morgan";
import * as bodyParser     from "body-parser";
import * as methodOverride from "method-override";
import * as serveStatic    from "serve-static";
import * as path           from "path";

/* Classes */
class ExpressApp {
	public app: express.Express;

	constructor() {
		this.app = express();
		this.configureApp();
	}

	private configureApp() {
		this.app.set('port', process.env.PORT || PORT);
		this.app.use(morgan(MORGAN_MODE));
		this.app.use(bodyParser.json());
		this.app.use(bodyParser.urlencoded({extended:true}));
		this.app.use(methodOverride());
		this.app.use(serveStatic(path.join(__dirname, PUBLIC_FOLDER)));
	}
}

/* Exports */
export default new ExpressApp().app;