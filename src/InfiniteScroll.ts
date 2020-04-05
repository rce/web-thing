import {fromEvent, interval, merge, Observable} from "rxjs"
import {distinctUntilChanged, map, throttleTime} from "rxjs/operators"
import {RefObject} from "react"

export interface ScrollPosition {
  scrollTop: number
  scrollTopMax: number
}

export function fromScrollEvents<ElementT extends HTMLElement>(elementRef: RefObject<ElementT>) {
  return merge(
    elementScrollChanges(elementRef.current!),
    // Sync every second in case the user is fast scroller
    // and I'm too lazy to properly fix the logic
    interval(1000)
  ).pipe(
    map(() => getScrollPosition(elementRef.current!)),
    distinctUntilChanged(jsonEquals)
  )
}

function elementScrollChanges<ElementT extends HTMLElement>(element: ElementT): Observable<ElementT> {
  // Take element scroll and window resize events since they both
  // can change whether we are close to the bottom of the element or not
  return merge(
    fromEvent(element, "scroll"),
    fromEvent(window, "resize")
  ).pipe(
    throttleTime(200),
    map(() => element)
  )
}

function jsonEquals(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b)
}

function getScrollPosition<ElementType extends HTMLElement>(e: ElementType): ScrollPosition {
  if (typeof window === "undefined")
    return { scrollTop: 0, scrollTopMax: 0 }

  return {
    scrollTop: e.scrollTop,
    scrollTopMax: e.scrollHeight - e.clientHeight
  }
}
