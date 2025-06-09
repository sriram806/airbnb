'use client';

import Container from '../Container'

import { TbBeach, TbMountain, TbPool } from 'react-icons/tb';
import { GiBoatFishing, GiIsland, GiWindmill,GiCastle, GiForestCamp, GiCaveEntrance, GiCactus, GiBarn } from 'react-icons/gi';
import { MdOutlineVilla } from 'react-icons/md';
import {FaSkiing} from 'react-icons/fa'
import CategoryBox from '../CategoryBox';
import {BsSnow} from 'react-icons/bs'
import { usePathname, useSearchParams } from 'next/navigation';

export const categories = [
    {
        label:'Beach',
        icon: TbBeach,
        description: 'This Property belongs to Beach'
    },
    {
        label:'Windmills',
        icon: GiWindmill,
        description: 'This Property belongs to Windmills'
    },
    {
        label:'Modern',
        icon: MdOutlineVilla,
        description: 'This Property belongs to Modern'
    },
    {
        label:'Countryside',
        icon: TbMountain,
        description: 'This Property belongs to Countryside'
    },
    {
        label:'Pools',
        icon: TbPool,
        description: 'This Property belongs to Pools'
    },
    {
        label:'Islands',
        icon: GiIsland,
        description: 'This Property belongs to Island'
    },
    {
        label:'Lake',
        icon: GiBoatFishing,
        description: 'This Property belongs to Lake'
    },
    {
        label: 'Skiing',
        icon: FaSkiing,
        description: 'This Property belongs to Skiing'
    },
    {
        label: 'Castel',
        icon: GiCastle,
        description: 'This Property belongs to Castel'
    },
    {
        label: "Camping",
        icon: GiForestCamp,
        description: 'This Property belongs to Camping'
    },
    {
        label: 'Arctic',
        icon: BsSnow,
        description: 'This Property belongs to Arctic'
    },
    {
        label: 'Cave',
        icon: GiCaveEntrance,
        description: 'This Property belongs to Cave'
    },
    {
        label: 'Desert',
        icon: GiCactus,
        description: 'This Property belongs to Desert'
    },
    {
        label: 'Barn',
        icon: GiBarn,
        description: 'This Property belongs to Barn'
    },
]
function Catagories() {
    const params = useSearchParams();
    const category = params?.get('category');
    const pathname = usePathname();

    const isMainPage = pathname === '/';

    if (!isMainPage){
        return null;
    }
    return (
        <Container>
            <div className='p-2 flex flex-row justify-between overflow-x-auto'>
                {categories.map((item)=>(
                    <CategoryBox
                        key={item.label}
                        label= {item.label}
                        icon = {item.icon}
                        selected = {category === item.label}
                    />
                ))}
            </div>
        </Container>
    )
}

export default Catagories