import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import { useColorMode } from '@docusaurus/theme-common';
import ThemedImage from '@theme/ThemedImage';
import ReactMarkdown from 'react-markdown';


export default function OrganisationBlock(
    { name, logoLight, logoDark, description, socials }: 
    { name: string, logoLight?: string, logoDark?: string, description: string, socials?: { name: string, link: string }[] }
) {
    const isDarkTheme = useColorMode().colorMode === "dark";

    const ImageFilter = (logoLight: string | undefined, logoDark: string | undefined) => {
        if (!logoLight && logoDark && !isDarkTheme) {
            return { filter: 'brightness(1.8) invert(1) contrast(1.5) saturate(1.5) sepia(1) hue-rotate(180deg) grayscale(1)' };
        } else if (logoLight && !logoDark && isDarkTheme) {
            return { filter: 'brightness(0.8) invert(1) contrast(1.5) saturate(1.5) sepia(1) hue-rotate(180deg) grayscale(1)' };
        }
        return {};
    };

    const getImageUrl = (url: string) => {
        if (/^(?:[a-z]+:)?\/\//i.test(url)) {
            return url;
        } else {
            return useBaseUrl(url);
        }
    };

    return (
        <div className="sm:tw-flex tw-gap-1 tw-items-center tw-text-sm">
            <div className="tw-min-w-[125px] tw-w-[125px] tw-text-center tw-pb-3 md:tw-pb-0">
                <ThemedImage
                    className="tw-max-h-[125px]"
                    alt={name}
                    sources={{
                        light: getImageUrl(logoLight ? logoLight : logoDark || ''),
                        dark: getImageUrl(logoDark ? logoDark : logoLight || '')
                    }}
                    style={ImageFilter(logoLight, logoDark)}
                />
            </div>
            <div className="sm:tw-ml-3 tw-w-full">
                <div className={socials ? '' : 'tw-mt-3'}>
                    <ReactMarkdown remarkPlugins={[]}>
                        {description}
                    </ReactMarkdown>
                </div>
                <div className="tw-flex -tw-mt-3">
                    {socials && socials.map((social: { name: string, link: string }, index: number) => (
                        <div key={social.name}>
                            <a href={social.link} target="_blank" rel="noreferrer">{social.name}</a>
                            {index < socials.length - 1 && <span className="tw-mx-1">•</span>}
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}