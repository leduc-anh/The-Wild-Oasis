import { HiOutlineMoon } from "react-icons/hi"
import ButtonIcon from "./ButtonIcon"
import { useDarkmode } from "../context/DarkmodeContext";
import { HiOutlineSun } from "react-icons/hi2";
function DarkmodeToggle() {
    const {isDarkmode, toggleDarkmode} = useDarkmode();
    return (
        <ButtonIcon onClick={toggleDarkmode}>
            {isDarkmode ? <HiOutlineSun /> : <HiOutlineMoon />}
        </ButtonIcon>
    )
}

export default DarkmodeToggle
