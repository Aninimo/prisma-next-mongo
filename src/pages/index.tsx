import { useRef, useState } from 'react'
import axios from 'axios'
import Modal from 'react-modal'
import { PrismaClient } from '@prisma/client'

import { FoodCard } from '../components/FoodCard'

const prisma = new PrismaClient()

export default function Home(props){
  const [modalIsOpen, setIsOpen] = useState(false)

  const foods = props.foods
  const formRef = useRef()

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function addNewFood(params) {
    const {
      addFoodName,
      addFoodPrice,
      addFoodImageUrl,
      addFoodActive,
      addFoodDescription,
      addFoodIngredients,
    } = formRef.current

    const name = addFoodName.value
    const price = addFoodPrice.value
    const imageUrl = addFoodImageUrl.value
    const active = addFoodActive.value
    const description = addFoodDescription.value
    const ingredients = addFoodIngredients.value

    await axios.post('/api/addFood', {
      name,
      price,
      imageUrl,
      active,
      description,
      ingredients,
    })
    window.location.reload()
  }

  return(
    <main>
      <div
        className='flex justify-between items-center p-4 bg-orange-400 text-white'
      >
        <h1 className='text-3xl font-bold'>
          Recipes 🥘🍲🥗🥙
        </h1>
        <button
          onClick={openModal}
          className='p-3 px-12 bg-blue-600 rounded text-white'
        >
          Add Food
        </button>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        className='items-center w-1/2 p-4 bg-gray-200 ml-64 mt-12'
      >
        <form ref={formRef}>
          <div className='flex flex-col'>
            <label>Name</label>

            <input

              name='addFoodName'

              className='w-52 border rounded'

            />

          </div>

          <div

            className='flex flex-col mt-4'

          >

            <label>

              Price

            </label>

            <input

              name='addFoodPrice'

              className='w-52 border rounded'

            />

          </div>

          <div

            className='flex flex-col mt-4'

          >

            <label>

              Active

            </label>

            <input

              name='addFoodActive'

              className='w-52 border rounded'

            />

          </div>

         <div

            className='flex flex-col mt-4'

          >

           <label>ImageUrl</label>

           <input name='addFoodImageUrl'/>

         </div>

          <div

            className='flex flex-col mt-4'

          >

            <label>

              Ingredients

            </label>

            <textarea

              name='addFoodIngredients'

                  type='text'

                ></textarea>

          </div>

          <div className='flex flex-col mt-4'>
            <label>Description</label>
           <textarea
               name='addFoodDescription'
               type='text'
           ></textarea>
          </div>
        </form>
        <button
          onClick={() => addNewFood()}
          className='p-3 px-12 bg-blue-600 rounded text-white mt-8'
        >
          Add
        </button>
      </Modal>
      <div className='grid grid-cols-3 gap-12 mt-4'>
        {foods?.map((food, i) => (
          <FoodCard food={food} key={i} />
        ))}
      </div>
    </main>
  )
}

export async function getServerSideProps() {
  const allFoods = await prisma.food.findMany()
  return {
    props: {
      foods: allFoods,
    },
  }
}
