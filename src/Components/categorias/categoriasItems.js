import {BsDisplay} from 'react-icons/bs'
import {ImFloppyDisk} from 'react-icons/im'
import {IoHardwareChip} from 'react-icons/io5'
import {FaHeadphones, FaMemory, FaMicrophoneAlt, FaMouse, FaDigitalTachograph} from 'react-icons/fa'
import {MdComputer} from 'react-icons/md'

const AllCategorias = [
    {name:'pc', icon: <MdComputer/>},
    {name: 'procesadores', icon: <IoHardwareChip/>},
    {name: 'graficas', icon: <FaDigitalTachograph/>},
    {name: 'ram', icon: <FaMemory/>},
    {name: 'almacenamiento', icon: <ImFloppyDisk/>},
    {name: 'monitores', icon: <BsDisplay/>},
    {name: 'mouse', icon: <FaMouse/>},
    {name: 'auriculares', icon: <FaHeadphones/>},
    {name: 'microfonos', icon: <FaMicrophoneAlt/>}
]




export default AllCategorias
