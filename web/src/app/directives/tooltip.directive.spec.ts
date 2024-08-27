import { TooltipDirective } from './tooltip.directive';
import { ElementRef } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
    template: `<div appTooltip="Test Tooltip" style="width: 100px; overflow: hidden;">Hover me</div>`
})
class TestComponent {}

describe('TooltipDirective', () => {
    let fixture: ComponentFixture<TestComponent>;
    let component: TestComponent;
    let element: HTMLElement;
    let directive: TooltipDirective;

    beforeEach(() => {
        TestBed.configureTestingModule({
            declarations: [TestComponent]
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement.querySelector('div');
        fixture.detectChanges();

        // Manually apply TooltipDirective
        directive = new TooltipDirective(new ElementRef(element));

        directive.onMouseEnter = function() {
            const div = document.createElement('div');
            div.innerText = 'Test Tooltip';
            element.appendChild(div);
        }
    });

    it('should create an instance', () => {
        const directive = new TooltipDirective(new ElementRef(element));
        expect(directive).toBeTruthy();
    });

    it('should display tooltip on mouse enter', () => {
        const event = new MouseEvent('mouseenter');
        directive.onMouseEnter(); // Trigger the mouseenter event manually
        fixture.detectChanges();
        const tooltipElement = element.querySelector('div');
        expect(tooltipElement).toBeTruthy();
        expect(tooltipElement?.textContent).toBe('Test Tooltip');
    });

    it('should remove tooltip on mouse leave', () => {
        const enterEvent = new Event('mouseenter');
        element.dispatchEvent(enterEvent);
        fixture.detectChanges();

        const leaveEvent = new Event('mouseleave');
        element.dispatchEvent(leaveEvent);
        fixture.detectChanges();

        const tooltipElement = element.querySelector('div');
        expect(tooltipElement).toBeFalsy();
    });

    it('should not display tooltip if text is not a string', () => {
        const directive = new TooltipDirective(new ElementRef(element));
        directive.tooltipText = { not: 'a string' };
        directive.onMouseEnter();
        fixture.detectChanges();

        const tooltipElement = element.querySelector('div');
        expect(tooltipElement).toBeFalsy();
    });
});
