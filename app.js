const dataLoad = async (phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    showData(data.data, true);
    return data;
}


const showData = (phones, showAll) => {
    console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.innerHTML = '';
    const phoneSection = document.getElementById('phones-section');
    phoneSection.innerHTML = '';

    if (phones.length === 0) {
        const div = document.createElement('div');
        div.innerHTML = `
        <h1 class="text-center text-4xl font-bold py-4 mb-10 text-red-400 ">This phone is not available here...</h1>
        `
        phoneSection.appendChild(div);
    }

    const showAllBtn = document.getElementById('show-all-btn');
    if (phones.length > 12) {
    }
    else {
    }

    if (showAll && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAllBtn.classList.remove('hidden');

    }
    else {
        showAllBtn.classList.add('hidden');
    }

    phones.forEach(phone => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card overflow-hidden border  py-10 border-gray-300 space-y-2 text-center">
                    <div class="flex mx-10 items-center rounded-xl py-8 bg-[#0D6EFD0D] justify-center">
                        <img class="phoneImg" src="${phone.image}" alt="">
                    </div>
                    <div class="space-y-2">
                        <h1 id="phone-name" class="text-2xl text-[#403F3F] font-bold">
                            ${phone?.phone_name}
                        </h1>
                        <p class="text-[#706F6F] text-[18px]">Elevate your communication with ${phone?.brand} phone. Tailored plans for seamless connectivity and convenience.</p>
                        <h2 class="text-black font-bold text-[20px] " >
                            $999
                        </h2>
                        <button class="px-6 py-3 bg-[#0D6EFD] text-white font-bold rounded-lg">
                            Show Details
                        </button>
                    </div>
                </div>
                `
        phoneContainer.appendChild(card)

    });
}


const searchPhone = () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    console.log(inputText);
    dataLoad(inputText);
}

const pageLoad = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/phones?search=samsung');
    const data = await res.json();
    showData(data.data, true);
}
pageLoad();

let showAll = true;
const showAllPhone = async () => {
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    let data;
    if (inputText === '') {
        data = await dataLoad('samsung');

    }
    else {
        data = await dataLoad(inputText);
    }
    showAll = false;
    showData(data.data, showAll)
}

