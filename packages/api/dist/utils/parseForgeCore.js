import { parse } from 'node-html-parser';
import { log } from "./index.js";
const extractUrls = (urls) => urls.reduce((acc, curr) => {
    if (curr.name === 'Changelog')
        return { ...acc, changelogUrl: curr.url };
    // Old versions got client / server, but new versions – universal installer
    if (curr.name === 'Server')
        return { ...acc, installerUrl: curr.url };
    if (curr.name === 'Universal')
        return { ...acc, installerUrl: curr.url };
    if (curr.name === 'Installer')
        return { ...acc, installerUrl: curr.url };
    if (curr.name === 'Mdk')
        return { ...acc, mdkUrl: curr.url };
    return acc;
}, {
    installerUrl: null,
    changelogUrl: null,
    mdkUrl: null,
});
export const parseCores = (html, version) => {
    const page = parse(html);
    const downloads = [...page.querySelectorAll('.download-list tbody tr')];
    log(`Found ${downloads.length} forge core files...`);
    const cores = downloads.map(el => {
        const coreVersion = el.querySelector('.download-version').innerText.trim();
        const uploadTime = el.querySelector('.download-time').getAttribute('title');
        const links = [...el.querySelectorAll('.download-links li')];
        const urls = links.map(link => {
            return {
                url: link.querySelector('a').getAttribute('href'),
                name: link.querySelector('a').innerText.trim()
            };
        });
        return {
            gameVersion: version,
            coreVersion,
            uploadTime,
            ...extractUrls(urls)
        };
    });
    return cores;
};
