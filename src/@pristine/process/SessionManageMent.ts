import {EncriptDecript} from "./EncriptDecript";
import {Injectable} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import * as Rx from "rxjs";

@Injectable({
    providedIn: 'root'
})
export class SessionManageMent {

    static sessionLogout: boolean = false;
    currentUser$ = new Rx.ReplaySubject(2, 100);

    constructor(private _encriptDecript: EncriptDecript, private _router: Router, private activateroute: ActivatedRoute) {
        // subscriber 1
        this.currentUser$.subscribe((data) => {
            // console.log('Subscriber A:', data);
            if (data == '') {
                if (SessionManageMent.sessionLogout == false) {
                    SessionManageMent.sessionLogout = true;
                    if (!window.location.href.includes('/pages/auth/login-2'))
                        this._router.navigateByUrl('/pages/auth/login-2');
                } else {
                    setTimeout(() => {
                            SessionManageMent.sessionLogout = false;
                        },
                        60000);
                }
            }
        });
// Behavior Subject
    }

    get getLocationName(): string {
        try {
            let LocationName: string = this._encriptDecript.decrypt(localStorage.getItem('ZV_SSLOCNA').toString());
            if (LocationName != null && LocationName != '' && LocationName != undefined && LocationName != '  ')
                return LocationName;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getRoleId(): string {
        try {
            let roleid: string = this._encriptDecript.decrypt(localStorage.getItem('ZV_Role').toString());
            if (roleid != null && roleid != '' && roleid != undefined && roleid != '  ')
                return roleid;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    // todo get session
    get getEmail(): string {
        try {
            let email_id: string = this._encriptDecript.decrypt(localStorage.getItem('ZV_SSID').toString());
            if (email_id != null && email_id != '' && email_id != undefined && email_id != '  ') {
                this.currentUser$.next(email_id);
                return email_id;
            } else {
                this.currentUser$.next('');
                return '';
            }
        } catch (e) {
            this.currentUser$.next('');
            return '';
        }
    }

    get getName(): string {
        try {
            let name: string = this._encriptDecript.decrypt(localStorage.getItem('ZV_SSNA').toString());
            if (name != null && name != '' && name != undefined && name != '  ')
                return name;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getLocationId(): string {
        try {
            let LocationId: string = this._encriptDecript.decrypt(localStorage.getItem('ZV_SSLOCID').toString());
            if (LocationId != null && LocationId != '' && LocationId != undefined && LocationId != '  ')
                return LocationId;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getGateEntryRequired(): string {
        try {
            let GateEntry: string = this._encriptDecript.decrypt(localStorage.getItem('ZV_GATE').toString());
            if (GateEntry != null && GateEntry != '' && GateEntry != undefined && GateEntry != '  ')
                return GateEntry;
            else
                return '0';
        } catch (e) {
            return '0';
        }
    }

    get getBarcode(): string {
        try {
            let Barcode: string = this._encriptDecript.decrypt(localStorage.getItem('Ziv_SSBAR').toString());
            if (Barcode != null && Barcode != '' && Barcode != undefined && Barcode != '  ')
                return Barcode;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getMenu(): any {
        try {
            return JSON.parse(this._encriptDecript.decrypt(localStorage.getItem('ZV_menu').toString()));
        } catch (e) {
            return undefined;
        }
    }

    get getShiftId(): string {
        try {
            let shift: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_SSSHIFT').toString());
            if (shift != null && shift != '' && shift != undefined && shift != '  ')
                return shift;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getWorkType(): string {
        try {
            let work: string = this._encriptDecript.decrypt(localStorage.getItem('ZIV_SSWORK').toString());
            if (work != null && work != '' && work != undefined && work != '  ')
                return work;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    get getPickType(): string {
        try {
            let work: string = this._encriptDecript.decrypt(localStorage.getItem('ZV_SSPick').toString());
            if (work != null && work != '' && work != undefined && work != '  ')
                return work;
            else
                return '';
        } catch (e) {
            return '';
        }
    }

    //todo end set session

    setNameSession(name: string) {
        localStorage.setItem('ZV_SSNA', this._encriptDecript.encrypt(name));
    }

    setLocationNameSession(locationname: string) {
        localStorage.setItem('ZV_SSLOCNA', this._encriptDecript.encrypt(locationname));
    }

    setLocationId(location_id: string) {
        localStorage.setItem('ZV_SSLOCID', this._encriptDecript.encrypt(location_id));
    }

    setPickType(pick: string) {
        localStorage.setItem('ZV_SSPick', this._encriptDecript.encrypt(pick));
    }

    setMenuSession(menu: any) {
        localStorage.setItem('ZV_menu', this._encriptDecript.encrypt(JSON.stringify(menu).toString()));
    }

    setGateEntryRequired(gateentry: string) {
        localStorage.setItem('ZV_GATE', this._encriptDecript.encrypt(gateentry));
    }

    setBarcode(barcode: any) {
        localStorage.setItem('Ziv_SSBAR', this._encriptDecript.encrypt(barcode));
    }

    setShift_IdSession(shiftname: string) {
        localStorage.setItem('ZIV_SSSHIFT', this._encriptDecript.encrypt(shiftname));
    }

    setWork_Type(workType: string) {
        localStorage.setItem('ZIV_SSWORK', this._encriptDecript.encrypt(workType));
    }

    // todo set sessions
    setEmailSession(email_Id: string) {
        // this.setCookie('ZV_SSID', this._encriptDecript.encrypt(email_Id), 1);
        localStorage.setItem('ZV_SSID', this._encriptDecript.encrypt(email_Id));
    }

    setRoleSession(roleId: string) {
        localStorage.setItem('ZV_Role', this._encriptDecript.encrypt(roleId));
    }

    //todo end get

    //todo cookie management

    // private setCookie(name: string, value: string, expireDays: number, path: string = '') {
    //     let d: Date = new Date();
    //     d.setTime(d.getTime() + expireDays * 24 * 60 * 60 * 1000);
    //     let expires: string = `expires=${d.toUTCString()}`;
    //     let cpath: string = path ? `; path=${path}` : '';
    //     document.cookie = `${name}=${value}; ${expires}${cpath}`;
    // }
    //
    // private getCookie(name: string) {
    //     let ca: Array<string> = document.cookie.split(';');
    //     let caLen: number = ca.length;
    //     let cookieName = `${name}=`;
    //     let c: string;
    //
    //     for (let i: number = 0; i < caLen; i += 1) {
    //         c = ca[i].replace(/^\s+/g, '');
    //         if (c.indexOf(cookieName) == 0) {
    //             return c.substring(cookieName.length, c.length);
    //         }
    //     }
    //     return '';
    // }
    //
    // private deleteCookie(name) {
    //     this.setCookie(name, '', -1);
    // }

    //todo end cookie
}
