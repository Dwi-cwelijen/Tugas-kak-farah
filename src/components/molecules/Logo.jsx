import Icon from "../atoms/Icons";
import Text from "../atoms/Text";

export default function Logo () {
    return (
        <div className="flex">
            <Icon name={"logo"}size={30} style={"md:size-10"} color={"#1E2E4F"}/>
            <Text text={"ArcesShop"} variant={"logo"} className="font-extrabold text-xl md:text-3xl"/>
        </div>
    );
}