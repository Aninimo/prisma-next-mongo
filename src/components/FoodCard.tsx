import Link from 'next/link'

export function FoodCard({ food }){
  return(
    <Link href={`/food/${food.id}`}>
      <div
        className='w-64 h-96 border-solid border-2 rounded'
      >
        <img src={food.imageUrl}/>
        <div className='p-3'>
          <h3 className='mt-4 mb-3'>
            {food.name}
          </h3>
          <div className='flex justify-between'>
            <p>
             Price(💵)
           </p>
           {food.price}
          </div>
        <div className='mt-3'>
          <span>
            Active
          </span>
          <p>
            {food.active}
          </p>
        </div>
        </div>
      </div>
    </Link>
  )
}
