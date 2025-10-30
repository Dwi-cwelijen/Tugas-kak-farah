import Icon from "../atoms/Icons";
import Text from "../atoms/Text";

export default function Logo () {
    return (
        <div className="flex">
            <Icon name={"logo"} style={"md:size-10"}/>
            <Text text={"ArcesShop"} variant={"black"} className="font-bold md:text-3xl"/>
        </div>
    );
}