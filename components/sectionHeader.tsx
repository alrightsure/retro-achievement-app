import clsx from "clsx";
import { Text } from "react-native";

export const SectionHeader = ({ children, className }: { children: React.ReactNode; className?: string }) => (
    <Text className={clsx("text-darkBlue font-bold text-2xl md:text-3xl", className)}>{children}</Text>
);
