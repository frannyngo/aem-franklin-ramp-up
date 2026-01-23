export default function decorate(block) {
    block.id = 'contact-cards'
    const container = document.getElementById('contact-cards')
    container.className = 'contactUsContainer';

    [...container.children].forEach(el => {
        const firstChild = el.firstElementChild
        firstChild.className = 'contactUsInformationContainer';

        [...firstChild.children].forEach((info, index) => {
            const email = info.querySelector('a')
            info.className = index === 0? 'contactUsName' : index === 1? 'contactUsTitle' : 'contactUsEmail'

            if (email) email.className = 'contactUsEmail'
        })
    })

    block.replaceChildren( container)
}