import {fromEvent, interval, merge, Observable} from "rxjs"
import {debounceTime, distinctUntilChanged, map} from "rxjs/operators"
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
    debounceTime(100),
    map(() => element)
  )
}

function jsonEquals(a: any, b: any) {
  return JSON.stringify(a) === JSON.stringify(b)
}

function getScrollPosition<ElementType extends HTMLElement>(e: ElementType): ScrollPosition {
  if (typeof window === "undefined")
    return { scrollTop: 0, scrollTopMax: 0 }
  const {
    scrollTop, // y of the top left corner
    scrollLeft, // x of the top left corner
    scrollHeight, // height of the whole element if not hidden by scroll
    clientHeight, // height of the visible part of the scroll
  } = e
  const scrollTopMax = e.scrollHeight - e.clientHeight
  return { scrollTop, scrollTopMax }
}
