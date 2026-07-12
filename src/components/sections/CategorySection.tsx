'use client'
import Image from "next/image"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"


const CategorySection = () => {
    const searchParams = useSearchParams()
    const router = useRouter()
    const pathName = usePathname()
    const [activeCategory, setActiveCategory] = useState('')

    const handleSetQuery = (cat: string) => {
        const params = new URLSearchParams(searchParams.toString())
        if (cat === "ALL") {
            params.delete("category");
        } else {
            params.set("category", cat);
        }
        const query = params.toString();
        router.push(query ? `${pathName}?${query}` : pathName);
    }

    const categories = [
        {
            name: 'All',
            icon: '/list.png',
            value: 'ALL'
        },
        {
            name: 'Car',
            icon: '/transport.png',
            value: 'CAR'
        },
        {
            name: 'Apartment',
            icon: '/apartment.png',
            value: 'APARTMENT'
        }
    ]

  return (
    <div className="grid grid-cols-4 gap-10">
        {categories?.length > 0 && categories?.map((c, index) => {
            return <div key={index}>
                <div onClick={() => handleSetQuery(c?.value)} className="text-center cursor-pointer">
                    <Image src={c?.icon} alt="category icon" width={50} height={50} className="mb-1 mx-auto"/>
                    <p className={`font-medium text-gray-700 ${searchParams.get('category') === c?.value ? 'text-primary' : !searchParams.get('category') && c?.value === 'ALL' ? 'text-primary' : ''}`}>{c?.name}</p>
                </div>
            </div>
        })}
    </div>
  )
}

export default CategorySection