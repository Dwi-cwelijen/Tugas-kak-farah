import Icon from "../atoms/Icons";
import Text from "../atoms/Text";

export default function Logo () {
    return (
        <div className="flex">
            <Icon name={"logo"} />
            <Text text={"ArcesShop"} variant={"black"} className="font-bold"/>
        </div>
    );
}