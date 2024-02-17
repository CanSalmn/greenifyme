import { View, Text } from 'react-native'
import React from 'react'
import { h, m, p, w } from '../../../utils';
import IconButton from '../../IconButton';


interface TransactionChadProp {
    SvgIcon: any;
    title: string;
    date: string;
    price: number,
    isExpense: boolean;
}
export default function TransactionCard({ SvgIcon, title, date, price, isExpense }: TransactionChadProp) {
    return (
        <View style={{ width: w(310), height: h(54), paddingHorizontal:p(15), flexDirection: 'row', justifyContent: 'space-between', backgroundColor: '#F5F9F9' }}>
            <View style={{ flexDirection: 'row', }}>
                <SvgIcon height={h(50)} width={w(50)} style={{ alignSelf: 'center' }} />
                <View style={{ marginLeft: m(12), marginTop: m(10) }}>
                    <Text style={{ fontWeight: 'bold', marginBottom: m(3) }}>{title}</Text>
                    <Text style={{ opacity: 0.5, fontSize: 10 }}>{date}</Text>
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: m(10) }}>
                {isExpense ?
                    <>
                        <Text style={{ fontWeight: 'bold', color: '#EE5353', marginRight: m(5) }} >{`-$${price}`}</Text>
                        <IconButton icon='arrow-down-l' iconFamily='Fontisto' size={15} style={{ opacity: 0.5 }} iconColor={'#EE5353'} />
                    </>
                    :
                    <>
                        <Text style={{ fontWeight: 'bold', color: '#24D4B0', marginRight: m(5) }} >{`+$${price}`}</Text>
                        <IconButton icon='arrow-up-l' iconFamily='Fontisto' size={15} style={{ opacity: 0.5 }} iconColor={'#24D4B0'} />
                    </>
                }
            </View>
        </View>
    )
}