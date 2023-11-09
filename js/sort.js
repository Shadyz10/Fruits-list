function bubbleMethod(arr, comparation) {
	const n = arr.length
	for (let i = 0; i < n - 1; i++) {
		for (let j = 0; j < n - 1 - i; j++) {
			if (comparation(arr[j], arr[j + 1])) {
				let temp = arr[j + 1]
				arr[j + 1] = arr[j]
				arr[j] = temp
			}
		}
	}
}


function quickSortMethod(arr, comparation) {
    if (arr.length < 2){
      return arr;
    }
	let left = []
	let right = []
	let currentItem= Math.floor(arr.length / 2)
	let pivot = arr[currentItem]

	
	for (let i = 0; i < arr.length; i++) {
		if (i ===currentItem){
			continue
		}
		if (comparation(arr[i], pivot)){
			right.push(arr[i])
		} else {
			left.push(arr[i])
		}    
	}       
    return fruits = [...quickSortMethod(left, comparation), pivot, ...quickSortMethod(right, comparation)]
}