import { parse } from 'node-html-parser';
import { convertExternalUrls } from './links';

export const parseCoresFromHTML = async (
  html: string,
  version: string
): Promise<ForgeCore[]> => {
  const page = parse(html);
  const downloads = [...page.querySelectorAll('.download-list tbody tr')];

  const cores = downloads.map((el) => {
    const coreVersion = el.querySelector('.download-version').innerText.trim();
    const uploadTime = el.querySelector('.download-time').getAttribute('title');

    const links = [...el.querySelectorAll('.download-links li')];
    const urls = links.map((link) => ({
      url: link.querySelector('a').getAttribute('href'),
      name: link.querySelector('a').innerText.trim(),
    }));

    return {
      gameVersion: version,
      coreVersion,
      uploadTime,
      ...convertExternalUrls(urls),
    };
  });

  return cores;
};
