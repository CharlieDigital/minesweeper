export function $<T extends HTMLElement>(selector: string) {
  return document.querySelector<T>(selector)
}

export function $$<T extends HTMLElement>(selector: string) {
  return [...document.querySelectorAll<T>(selector)]
}

export function $id<T extends HTMLElement>(id: string) {
  return document.getElementById(id) as T | null
}

export function $class<T extends HTMLElement>(className: string) {
  return [...document.getElementsByClassName(className)] as T[]
}
