import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MenuOption } from "react-native-popup-menu"
import { View, Text } from 'react-native';


export const MenuItem = ({ text, action, value, icon }) => {
    return (
        (
            <MenuOption onSelect={() => action(value)}>
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }} className='px-4 py-1 '>
                    <Text style={{ fontSize: hp(1.7) }} className='font-semibold text-white' >
                        {text}
                    </Text>
                    {icon}

                </View>

            </MenuOption>

        )
    )
}