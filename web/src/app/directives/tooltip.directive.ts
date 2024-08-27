import { Directive, HostListener, Input, ElementRef } from '@angular/core';

/**
 * Directive for adding tooltips to elements.
 *
 * Usage:
 * - Add the 'appTooltip' attribute to the target elements.
 * - Bind the tooltip text to the 'appTooltip' attribute value.
 * - The tooltip will be displayed when the mouse enters the target element, and
 *   removed when the mouse leaves.
 *
 * Example:
 * ```
 * <button [appTooltip]="'Click me!'">Hover over me</button>
 * ```
 */
@Directive({
    selector: '[appTooltip]',
    standalone: true
})
export class TooltipDirective {
    @Input('appTooltip') tooltipText: any;
    tooltipElement: HTMLDivElement | undefined;

    constructor(private el: ElementRef) { }

    @HostListener('mouseenter') onMouseEnter() {
        if (!this.tooltipElement && this.el.nativeElement.offsetWidth < this.el.nativeElement.scrollWidth) {
            this.tooltipElement = document.createElement('div');
            this.tooltipElement.style.position = 'absolute';
            this.tooltipElement.style.border = '1px solid #333';
            this.tooltipElement.style.backgroundColor = '#333';
            this.tooltipElement.style.color = '#fff';
            this.tooltipElement.style.padding = '10px';
            this.tooltipElement.style.borderRadius = '3px';
            this.tooltipElement.style.boxShadow = '0 2px 10px rgba(0,0,0,0.2)';
            this.tooltipElement.style.top = '100%';
            this.tooltipElement.style.left = '50%';
            this.tooltipElement.style.transform = 'translate(-50%, 10px)';
            this.tooltipElement.style.whiteSpace = 'nowrap';
            this.tooltipElement.style.fontSize = '14px';
            this.tooltipElement.style.zIndex = '999';
            if (typeof this.tooltipText === "string") {
                this.tooltipElement.textContent = this.tooltipText;
            } else {
                return;
            }
            this.el.nativeElement.appendChild(this.tooltipElement);

            // Calculate available space to the right, and, if not enough, adjust position
            let spaceToRight = window.innerWidth - (this.el.nativeElement.getBoundingClientRect().left + this.tooltipElement.offsetWidth);

            if (spaceToRight < 0) {
                this.tooltipElement.style.right = '0';
                this.tooltipElement.style.left = 'auto';
            } else {
                this.tooltipElement.style.left = '50%';
                this.tooltipElement.style.transform = 'translate(-50%, 10px)';
            }
        }
    }

    @HostListener('mouseleave') onMouseLeave() {
        if (this.tooltipElement) {
            this.el.nativeElement.removeChild(this.tooltipElement);
            this.tooltipElement = undefined;
        }
    }
}
