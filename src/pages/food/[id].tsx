import { useRef, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import Modal from 'react-modal'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export default function Food(props){
  const [modalIsOpen, setIsOpen] = useState(false)

  const { food } = props
  const formRef = useRef()
  const router = useRouter()

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  async function editFood() {
    const {
      editFoodName,
      editFoodPrice,
      editFoodImageUrl,
      editFoodActive,
      editFoodDescription,
      editFoodIngredients,
    } = formRef.current;

    const name = editFoodName.value;
    const price = editFoodPrice.value;
    const imageUrl = editFoodImageUrl.value;
    const active = editFoodActive.value;
    const description = editFoodDescription.value;
    const ingredients = editFoodIngredients.value;

    await axios.put('/api/editFood', {
      id: food?.id,
      name,
      price,
      imageUrl,
      active,
      description,
      ingredients,
    })
    window.location.reload()
  }

  async function deleteFood() {
    if (window.confirm("Do you want to delete this food?")) {
      await axios.post('/api/deleteFood', { id: food?.id })
      router.push('/')
    }
  }

  return(
    <main
      className='flex justify-center mt-8'
    >
      <img src={food?.imageUrl}/>
      <div>
        <div className='w-52 h-1 bg-black'/>
        <h2>
          {food?.name}
        </h2>
        <div className='w-52 h-1 bg-black'/>
          <div
            className='flex gap-4 mt-8 mb-4'
          >
            <button
              onClick={openModal}
              className='p-3 px-12 bg-blue-600 text-white rounded'
            >
              Edit
            </button>
          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            className='items-center w-1/2 p-4 bg-gray-200 ml-64 mt-12'
          >
            <form ref={formRef}>
              <div className='flex flex-col mb-8'>
                <label>Name</label>
                <input
                  className='border'
                  defaultValue={food?.name}
                  name='editFoodName'
                />
              </div>
              
             <div className='flex flex-col mb-8'>
              <label>Price</label>

              <input
                defaultValue={food?.price}
                name='editFoodPrice'
              />
            </div>
            <div
              className='flex flex-col mb-8'>
              <label>Active</label>

              <input

                defaultValue={food?.active}

                    name='editFoodActive'

              />

            </div>

            <div

              className='flex flex-col mb-8'

            >

              <label>

                ImageUrl

              </label>

              <input
                  defaultValue={food?.imageUrl}
                  name='editFoodImageUrl'
              />
            </div>
            <div className='flex flex-col mb-8'>

              <label>

                Ingredients

              </label>

              <textarea

                  defaultValue={food?.ingredients}

                  name='editFoodIngredients'

                ></textarea>

            </div>

            <div

              className='flex flex-col'

            >

              <label>

                Description

              </label>

              <textarea

                  defaultValue={food?.description}

                  name='editFoodDescription'

                ></textarea>

            </div>

          </form>

          <button
            onClick={() => editFood()}
            className='p-3 px-12 bg-blue-500 text-white rounded mt-8'>
              Edit
          </button>

        </Modal>

        

        <button

          onClick={deleteFood}

          className='p-3 px-12 bg-red-600 text-white rounded'

        >

          Delete

        </button>

      </div>

      <p>price(💵) {food?.price}</p>

        <h1 className='mt-4'>Ingredients</h1>

        <div className='w-52 h-1 bg-black'/>

        <p>

          {food?.ingredients}

        </p>

        <h1

          className='mt-4'

        >

          Description

        </h1>

        <div className='w-52 h-1 bg-black'/>

        <p>{food?.description}</p>
      </div>
    </main>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.params;
  const food = await prisma.food.findUnique({ 
    where: { id }
  })

  return {
    props: {
      food,
    },
  }
}
