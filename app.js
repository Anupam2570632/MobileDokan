const dataLoad = async (phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    showData(data.data, true);
    return data;
}

dataLoad('samsung',true);

const showData = (phones, showAll) => {
    console.log(phones);

    document.getElementById('loading-spinner').classList.remove('hidden');

    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.innerHTML = '';
    const phoneSection = document.getElementById('phones-section');
    phoneSection.innerHTML = '';

    if (phones.length === 0) {
        const div = document.createElement('div');
        document.getElementById('loading-spinner').classList.add('hidden');
        div.innerHTML = `
        <h1 class="text-center text-4xl font-bold py-4 mb-10 text-red-400 ">This phone is not available here...</h1>
        `
        phoneSection.appendChild(div);
    }

    const showAllBtn = document.getElementById('show-all-btn');

    if (showAll && phones.length > 12) {
        phones = phones.slice(0, 12);
        showAllBtn.classList.remove('hidden');
    }
    else {
        showAllBtn.classList.add('hidden');
    }

    phones.forEach(phone => {

        document.getElementById('loading-spinner').classList.add('hidden');
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
                        <button onclick="showDetails('${phone.slug}')" class="px-6 py-3 bg-[#0D6EFD] text-white font-bold rounded-lg">
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

const phoneDetails = async (id) => {
    const detailsData = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await detailsData.json();

    console.log(data.data)
    showPhoneDetails(data.data)
    my_modal_4.showModal();
}


const showDetails = (id) => {
    phoneDetails(id);
}

const showPhoneDetails = (phone) => {
    const modal = document.getElementById('modal');
    modal.innerHTML = `
    <div class="flex flex-col items-start justify-center gap-4 p-4">
    <div class="flex justify-center items-center w-full">
    <img class="" src="${phone.image}" alt="">
    </div>
    <h1>${phone.name}</h1>
    <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.</p>
    <h2>Storage : ${phone.mainFeatures.storage}</h2>
    <h2>Display size : ${phone.mainFeatures.displaySize}</h2>
    <h2>ChipSet : ${phone?.mainFeatures?.chipSet}</h2>
    <h2>Memory : ${phone.mainFeatures.memory}</h2>
    <h2>Slug : ${phone.slug}</h2>
    <h2>Release Date : ${phone.releaseDate}</h2>
    <h2>Brand : ${phone.brand}</h2>
    <h2>GPS : ${phone?.others?.GPS}</h2>
    </div>
    `
}


// const closeModal = () => {
//     document.getElementById('my_modal_2').classList.add('hidden');
// }