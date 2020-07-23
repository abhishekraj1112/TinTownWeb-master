import {Directive, ElementRef, OnDestroy, OnInit, Renderer2} from '@angular/core';
import {Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {pristineMatchMediaService} from "../../services/match-media.service";


@Directive({
    selector: '.inner-scroll'
})
export class pristineInnerScrollDirective implements OnInit, OnDestroy {
    // Private
    private _parent: any;
    private _grandParent: any;
    private _unsubscribeAll: Subject<any>;

    /**
     * Constructor
     *
     * @param {ElementRef} _elementRef
     * @param {pristineMatchMediaService} _pristineMediaMatchService
     * @param {Renderer2} _renderer
     */
    constructor(
        private _elementRef: ElementRef,
        private _pristineMediaMatchService: pristineMatchMediaService,
        private _renderer: Renderer2
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // Get the parent
        this._parent = this._renderer.parentNode(this._elementRef.nativeElement);

        // Return, if there is no parent
        if (!this._parent) {
            return;
        }

        // Get the grand parent
        this._grandParent = this._renderer.parentNode(this._parent);

        // Register to the media query changes
        this._pristineMediaMatchService.onMediaChange
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((alias) => {

                if (alias === 'xs') {
                    this._removeClass();
                } else {
                    this._addClass();
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Return, if there is no parent
        if (!this._parent) {
            return;
        }

        // Remove the class
        this._removeClass();

        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Add the class name
     *
     * @private
     */
    private _addClass(): void {
        // Add the inner-scroll class
        this._renderer.addClass(this._grandParent, 'inner-scroll');
    }

    /**
     * Remove the class name
     * @private
     */
    private _removeClass(): void {

        // Remove the inner-scroll class
        this._renderer.removeClass(this._grandParent, 'inner-scroll');
    }
}
