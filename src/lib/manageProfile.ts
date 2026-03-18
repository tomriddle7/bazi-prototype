/* eslint-disable @typescript-eslint/ban-ts-comment */
const key = 'profile';

export function saveProfile(info: any) {
    // @ts-expect-error
    const infoList = JSON.parse(localStorage.getItem(key)) || [];
    infoList.push(info)
    localStorage.setItem(key, JSON.stringify(infoList));
    const event = new CustomEvent("storageUpdate");
    window.dispatchEvent(event);
}

export function loadProfileList() {
    // @ts-expect-error
    return JSON.parse(localStorage.getItem(key)) || [];
}

export function loadProfile(idx: number) {
    // @ts-expect-error
    const infoList = JSON.parse(localStorage.getItem(key)) || [];
    return infoList[idx];
}

export function deleteProfile(idx: number) {
    // @ts-expect-error
    const infoList = JSON.parse(localStorage.getItem(key));
    infoList.splice(idx, 1);
    localStorage.setItem(key, JSON.stringify(infoList));
    const event = new CustomEvent("storageUpdate");
    window.dispatchEvent(event);
}