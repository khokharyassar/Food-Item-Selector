let foodArray = [];
const foodScores = {};
const colors = ['#FFC1C1', '#FFD1A1', '#FFF3A1', '#D1FFA1', '#A1FFDA', '#A1EFFF', '#A1C1FF', '#D1A1FF', '#FFA1E1'];

function addFood() {
    const foodInput = document.getElementById('foodInput');
    const food = foodInput.value.trim();

    if (food) {
        foodArray.push(food);
        if (!foodScores[food]) {
            foodScores[food] = 0;  // Initialize score
        }
        updateFoodList();
        foodInput.value = '';
        document.getElementById('pickFoodBtn').disabled = false; // Enable button
    } else {
        alert('Please enter a food item');
    }
}

function updateFoodList() {
    const foodList = document.getElementById('foodList');
    foodList.innerHTML = '';

    foodArray.forEach((food, index) => {
        const li = document.createElement('li');
        li.textContent = food;
        li.style.backgroundColor = colors[index % colors.length];

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Remove';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = () => deleteFood(index);

        li.appendChild(deleteBtn);
        foodList.appendChild(li);
    });

    // Disable button if no items
    document.getElementById('pickFoodBtn').disabled = foodArray.length === 0;
}

function deleteFood(index) {
    const food = foodArray[index];
    foodArray.splice(index, 1);
    if (foodArray.length === 0) {
        delete foodScores[food]; // Remove from scores
    }
    updateFoodList();
}

function pickRandomFood() {
    if (foodArray.length === 0) {
        alert('Please add some foods first');
        return;
    }

    const randomIndex = Math.floor(Math.random() * foodArray.length);
    const selectedFood = foodArray[randomIndex];
    foodScores[selectedFood]++;  // Increment score
    document.getElementById('selectedFood').textContent = `You should eat: ${selectedFood}`;
    openModal();
    updateFoodScores();
}

function updateFoodScores() {
    const foodScoresElement = document.getElementById('foodScores');
    foodScoresElement.innerHTML = '<h2>Food Scores</h2>';

    for (const food in foodScores) {
        const score = foodScores[food];
        const scoreElement = document.createElement('div');
        scoreElement.textContent = `${food}: ${score} times`;
        foodScoresElement.appendChild(scoreElement);
    }
}

function openModal() {
    document.getElementById('foodModal').style.display = 'flex';
}

function closeModal() {
    document.getElementById('foodModal').style.display = 'none';
}

// Close the modal when clicking outside of it
window.onclick = function(event) {
    const modal = document.getElementById('foodModal');
    if (event.target === modal) {
        closeModal();
    }
}

    