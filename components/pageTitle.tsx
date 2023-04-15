import { useState } from "react";
import { Text } from "react-native";
import { clsx } from "clsx";

export const PageTitle = ({ children, textClassName }: { children: React.ReactNode; textClassName?: string }) => {
    const [fontSize, setFontSize] = useState(24);
    return (
        <Text
            adjustsFontSizeToFit
            className={clsx(`text-white font-avantGardeBold md:text-3xl`, textClassName)}
            style={{ fontSize: fontSize }}
            onTextLayout={event => {
                const { lines } = event.nativeEvent;
                if (lines.length > 3) {
                    setFontSize(fontSize - 1);
                }
            }}
        >
            {children}
        </Text>
    );
};
