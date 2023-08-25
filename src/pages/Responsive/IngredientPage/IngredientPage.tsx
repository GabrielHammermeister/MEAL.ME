import React, { useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import './IngredientPage.styles.css'
import { getInformationById } from '@/services/spoonacular/spoonacular.service'
import { MacroNutrient, MacroSummary } from '@/components/MacroSummary/MacroSummary'
import { TableInfoNutri } from '@/pages/Responsive/IngredientPage/TableInfoNutri/TableInfoNutri'
import { PageTitle } from '@/components/PageTitle/PageTitle'

type Nutrients = Array<{ name: string; amount: number; unit: string }>
export type Nutrient = { name: string; amount: number; unit: string }

// type Macros = Array<Nutrient>
//
// type Macro = {
//   amount: number
//   unit: string
//   percent: number
// }

export type MacroSummary = {
  calories: number
  fats: MacroNutrient
  carbs: MacroNutrient
  proteins: MacroNutrient
}

interface Nutrition {
  nutrients: Nutrients
  caloricBreakdown: {
    percentCarbs: number
    percentFat: number
    percentProtein: number
  }
}

const Section = ({ children }: { children: any }) => {
  return (
    <section className={'py-4 bg-neutral-50 mx-[-14px] px-3.5 border-t-gray-500 border-t-2'}>
      {children}
    </section>
  )
}

export const IngredientPage = () => {
  const { id: ingredientId } = useParams()
  const [ingredientName, setIngredientName] = useState('-')
  const [loadingMacros, setLoadingMacros] = useState(true)

  // @ts-ignore
  const [macroNutrients, setMacroNutrients] = useState<MacroSummary>({})
  const [nutrients, setNutrients] = useState<Array<Nutrient>>([])

  const filterMacros = ({ nutrients, caloricBreakdown }: Nutrition) => {
    nutrients.forEach((nutrient) => {
      if (nutrient.name === 'Protein') {
        setMacroNutrients((prev) => ({
          ...prev,
          proteins: {
            amount: nutrient.amount,
            unit: nutrient.unit,
            percent: caloricBreakdown.percentProtein,
          },
        }))
      } else if (nutrient.name === 'Fat') {
        setMacroNutrients((prev) => ({
          ...prev,
          fats: {
            amount: nutrient.amount,
            unit: nutrient.unit,
            percent: caloricBreakdown.percentFat,
          },
        }))
      } else if (nutrient.name === 'Carbohydrates') {
        setMacroNutrients((prev) => ({
          ...prev,
          carbs: {
            amount: nutrient.amount,
            unit: nutrient.unit,
            percent: caloricBreakdown.percentCarbs,
          },
        }))
      } else if (nutrient.name === 'Calories') {
        setMacroNutrients((prev) => ({
          ...prev,
          calories: nutrient.amount,
        }))
      }
    })
    setLoadingMacros(false)
  }

  function omitMacros(nutrients: Array<any>) {
    const filter = ['Fat', 'Protein', 'Carbohydrates', 'Calories']
    return nutrients.filter((nutrient) => !filter.includes(nutrient.name) && nutrient.amount > 0)
  }

  const fetchIngredient = async () => {
    try {
      const res = await getInformationById(ingredientId)
      const {
        data: { nutrition, name },
      } = res

      setIngredientName(name)
      setNutrients(omitMacros(nutrition.nutrients))
      filterMacros(nutrition)
    } catch (err) {
      console.error(err)
    }
  }
  useEffect(() => {
    fetchIngredient()
  }, [])

  return (
    <div className={'flex flex-col'}>
      <header className={'flex justify-center py-4 pb-10 bg-emerald-600'}>
        <div
          className={
            'outline-[#34d39938] outline-opacity-80 outline-8 outline h-36 w-36 rounded-full bg-black bg-carrots bg-cover bg-center bg-no-repeat'
          }
        ></div>
      </header>
      <main className={'pb-10 rounded-t-2xl bg-white mt-[-1.5rem] px-3.5'}>
        <PageTitle text={ingredientName} />

        <Section>
          <Typography variant='subtitle2'>Macro Nutrients</Typography>
          <MacroSummary macros={macroNutrients} loading={loadingMacros} />
        </Section>
        <div className={'mt-4'}></div>
        <TableInfoNutri macroNutrients={macroNutrients} nutrients={nutrients} />

        {/* <div className='grid-dashboard'>*/}
        {/*  /!* <Paper sx={{ gridColumn: 'span 2', gridRow: 'span 1' }}>*!/*/}
        {/*  /!*  <Box*!/*/}
        {/*  /!*    p={2}*!/*/}
        {/*  /!*    display='flex'*!/*/}
        {/*  /!*    flexDirection='column'*!/*/}
        {/*  /!*    justifyContent='space-between'*!/*/}
        {/*  /!*    height='100%'*!/*/}
        {/*  /!*  >*!/*/}
        {/*  /!*    <Typography variant='subtitle2'>Macro Nutrients</Typography>*!/*/}
        {/*  /!*    <MacroSummary macros={macroNutrients} loading={loadingMacros} />*!/*/}
        {/*  /!*  </Box>*!/*/}
        {/*  /!* </Paper>*!/*/}
        {/* </div>*/}
      </main>
    </div>
  )
}
