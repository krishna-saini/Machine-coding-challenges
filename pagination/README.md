Pagination  on page 1 ->      <u>1</u> 2 3 Next
pagination on page 2 -> prev 1 __2__ 3 Next
pagination on last page => prev 1 2 __3__

// API used -->  https://dummyjson.com/products

# CR no.1 UI

# CR no.2
Add JS on pagination

Task 1 --> clicking on any page should take to content of that page (done)
Task 2 --> clicking on Next page should take to next page (done)
Task 3 --> clicking on Prev Page should take to prev page (done)
Task 4 --> user should be able to see visually the page on which it is right now (done)
Task 5 --> do not render pagination if there are no item to be rendered on 2nd page (done)

# CR no. 3 Accessibility
Task 1 --> user should able to tab through each item (done)
Task 2 --> user should able to press enter while the item is in focus and it should take user to desired URL
Task 3 --> user should able to focus pagination and tab through them (Done)

# CR no.4 Responsive 

# CR no. 5 Refactoring

# CR no. 6 Can we use event delegation?

# CR no. 7 -> do pagination from backend
it will be more performant and improves browser performance as frontend duty will be less (d0ne)




# Learning 

## bam convention classname
 classname = product__single

## Array() 
Array() is a constructor function used to create a new array.
Array(2) -> [undefined, undefined]
Array(2.5) --> error

use onClick(() => setState(5)) instead of onClick(setState(5))

use pagination logic from backend to reduce load on frontend