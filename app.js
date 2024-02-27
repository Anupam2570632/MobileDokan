const dataLoad = async (phoneName) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${phoneName}`);
    const data = await res.json();
    showData(data.data);
}


const showData = (phones) => {
    console.log(phones);

    const phoneContainer = document.getElementById('phone-container');

    phoneContainer.innerHTML = '';

    phones = phones.slice(0,12);

    phones.forEach(phone => {
        const card = document.createElement('div');
        card.innerHTML = `
        <div class="card p-10 border border-gray-300 space-y-4 text-center">
                    <div class="flex items-center rounded-xl py-8 bg-[#0D6EFD0D] justify-center">
                        <img src="${phone.image}" alt="">
                    </div>
                    <div class="space-y-4">
                        <h1 id="phone-name" class="text-2xl text-[#403F3F] font-bold">
                            ${phone?.phone_name}
                        </h1>
                        <p class="text-[#706F6F] text-[18px]">Elevate your communication with ${phone?.brand} phone. Tailored plans for seamless connectivity and convenience.</p>
                        <h2>
                            ${phone?.slug}
                        </h2>
                        <button class="px-6 py-2 bg-[#0D6EFD] text-white font-bold rounded-lg">
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

