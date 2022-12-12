function PriorityQueue() {
  const values = [];

  return {
    put: (value, priority) => {
      let newNode = {value, priority};
      values.push(newNode);

      let index = values.length - 1;
      const element = values[index];

      while(index > 0) {
        let parentIndex = Math.floor((index - 1) / 2);
        const parent = values[parentIndex];

        if(element.priority >= parent.priority) break;
        values[parentIndex] = element;
        values[index] = parent;
        index = parentIndex;
      }
      // return values;
    },

    get: () => {
      const min = values[0];
      const end = values.pop();
      if(values.length > 0) {
        values[0] = end;

        let index = 0;
        const length = values.length;
        const element = values[0];

        while(true) {
          let leftIndex = 2 * index + 1;
          let rightIndex = 2 * index + 2;
          let leftChild, rightChild;
          let swap = null;

          if(leftIndex < length) {
            leftChild = values[leftIndex];
            if(leftChild.priority < element.priority) {
              swap = leftIndex;
            }
          }
          if(rightIndex < length) {
            rightChild = values[rightIndex];
            if((swap === null && rightChild.priority < element.priority) || (swap !== null && rightChild.priority < leftChild.priority)) {
              swap = rightIndex;
            }
          }
          if(swap === null) break;
          values[index] = values[swap];
          values[swap] = element;
          index = swap;
        }
      }
      return min.value;
    },
    isEmpty: () => {
      return (values.length === 0) ? true : false;
    }
  }
}

module.exports = PriorityQueue;
