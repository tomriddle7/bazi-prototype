const key = 'profile';

export function saveProfile(info: any) {
    const infoList = JSON.parse(localStorage.getItem(key) || '[]');
    infoList.push(info)
    localStorage.setItem(key, JSON.stringify(infoList));
    const event = new CustomEvent("storageUpdate");
    window.dispatchEvent(event);
}

export function loadProfileList() {
    return JSON.parse(localStorage.getItem(key) || '[]');
}

export function loadProfile(idx: number) {
    const infoList = JSON.parse(localStorage.getItem(key) || '[]');
    return infoList[idx];
}

export function deleteProfile(idx: number) {
    const infoList = JSON.parse(localStorage.getItem(key) || '[]');
    infoList.splice(idx, 1);
    localStorage.setItem(key, JSON.stringify(infoList));
    const event = new CustomEvent("storageUpdate");
    window.dispatchEvent(event);
}