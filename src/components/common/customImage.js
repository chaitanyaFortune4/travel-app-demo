import { useEffect, useState } from "react";
import Image from "next/image";

export default function CustomImage(props) {

    const fixForImageRatio = {
        // width: 0,
        // height: 0,
        sizes: "100vw",
        style: { width: "100%", height: "auto" },
    };

    const options = {
        alt: props.alt,
        loading: "lazy",
        ...props,
    };

    if (typeof options.alt == "undefined" || options.alt == "" || options.alt == null) {
        options.alt = "Travel Application";
    }

    // if (typeof options.src == "undefined" || options.src == "" || options.src == null) {
    //     options.src = "/images/thumbnail.jpg";
    // }

    if (typeof options.aspectratio !== "undefined" && options.aspectratio == "true") {
        Object.keys(fixForImageRatio).map((key) => {
            options[key] = fixForImageRatio[key];
        });
    }

    if (typeof options.priority !== "undefined" && options.priority) {
        delete options.loading;
    }

    const [imgOptions, setImgOptions] = useState(options);

    useEffect(() => {
        setImgOptions(options);
    }, [props]);
    useEffect(() => {
        if (imgOptions.src === null) {
            updateFallbackImage();
        }
    }, [imgOptions.src]);

    const updateFallbackImage = () => {
        setImgOptions({
            ...imgOptions,
            src: "data:image/jpeg;base64,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",
            style: null,
        });
    };

    return (
        <>
            {imgOptions.src && (
                <Image
                    {...imgOptions}
                    onError={() => {
                        updateFallbackImage();
                    }}
                />
            )}
        </>
    );
}