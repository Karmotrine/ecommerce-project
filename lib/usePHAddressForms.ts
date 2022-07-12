// Automatically checks the sources, gives updated data about PH locations
import { psgc } from 'ph-locations';

export const { regions, provinces, citiesMunicipalities } = psgc

type locationArrayItem = PSGCRegion | PSGCProvince | PSGCCitiesMunicipality

export function usePHAddressForms() {
    return {
        getProvincesByRegion: (region: PSGCRegion): locationArrayItem[] => {
            return provinces.filter((province, key) => {
                return province.region === region.code
            })
        },
        getCityMunByProvince: (province : PSGCProvince): locationArrayItem[] => {
            return citiesMunicipalities.filter((cityMun, key) => {
                return cityMun.province === province.code
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