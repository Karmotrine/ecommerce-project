// Automatically checks the sources, gives updated data about PH locations
import { psgc } from 'ph-locations';
import { X } from 'tabler-icons-react';

export const { regions, provinces, citiesMunicipalities } = psgc

type locationArrayItem = PSGCRegion | PSGCProvince | PSGCCitiesMunicipality

export function usePHAddressForms() {
    return {
        getProvincesByRegion: (regionString: string): locationArrayItem[] => {
            const regionToFind = regions.find((region:PSGCRegion) => region.name == regionString)
            return provinces.filter((province, key) => {
                return province.region === regionToFind.code
            })
        },
        getCityMunByProvince: (provinceString : string): locationArrayItem[] => {
            const provinceToFind = provinces.find((province:PSGCProvince) => province.name == provinceString)
            return citiesMunicipalities.filter((cityMun, key) => {
                return cityMun.province === provinceToFind.code
            })
        },
        sort: (sortKey : "asc" | "desc", array : locationArrayItem[]): object[] => {
            if (sortKey === "asc")
                return array.sort((a,b) => a.name.localeCompare(b.name))
            else if (sortKey === "desc")
                return array.sort((a,b) => b.name.localeCompare(a.name))
            else
                return []
        }
    }
}