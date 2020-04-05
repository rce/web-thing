import {MonoTypeOperatorFunction} from "rxjs"
import {tap} from "rxjs/operators"
import React from "react"

export function tapLog<T>(name: string): MonoTypeOperatorFunction<T> {
  return tap(value => console.log(`${name}$ ->`, value))
}


export function DebugValue({ name, value }: { name: string, value: any }) {
  return (
    <pre>{name} === {JSON.stringify(value, null, 2)}</pre>
  )
}

