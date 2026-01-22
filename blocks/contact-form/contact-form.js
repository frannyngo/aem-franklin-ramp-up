import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
    block.id = 'contact-form'
    const container = document.getElementById('contact-form')
    console.log('*** container ', container)

    const form = document.createElement('form');
    form.method = 'POST';
    form.action = '/'; // TODO: submission url
    form.id = 'contact-form';
    console.log('*** form ', form);

    [...container.children].forEach((element, index) => {
        const div = element

        if (div) {
            switch (index) {
                case 0:  // header
                div.className = 'header'
                break;
                case 1: //subHeader 
                div.className = 'subHeader'
                break;
                default: 
                console.log('*** default div ', div)
                const container = div.firstElementChild
                const fragment = container.querySelector('p')

                if (fragment) {
                    const value = fragment.textContent.trim()
                    // turn into camelCase
                    const camelCase = value.toLowerCase()
                        .replace(/[^a-z0-9\s]/g, '') 
                        .trim()
                        .split(/\s+/)
                        .map((word, index) =>
                        index === 0
                            ? word
                            : word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join('');

                        fragment.className = camelCase
                        const input = document.createElement('input')
                        input.type = 'text'
                        input.name = value
                        input.placeholder = value
                        input.required = true

                        container.append(input)
                        // form.append(input)
                    // const secondFragment = div.children[1]
                    // const secondFragment = secondFragment.querySelector('p')
                    // check for a 2nd column on the same block
                    // const hasSecondChild = secondFragment.hasChildNodes()
                    // console.log('*** secondFragment ', secondFragment)
                    // console.log('*** hasSecondChild ', hasSecondChild)
                    // console.log('*** secondFragment ', secondFragment)
                console.log('*** input ', input)

                console.log('*** fragment ', fragment)
                console.log('*** value ', value)
                console.log('*** firstFrag ', container)

                }

                break;
            }
       

        }
});
//   block.replaceChildren(ul);
}
