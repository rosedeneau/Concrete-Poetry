const rawText = `The Beautiful Salmon Joanna Kavenna I’ve always loved salmon. Not to eat, as I don’t eat fish, but I’ve always loved salmon in general because salmon jump and no one knows why. They jump all over the place—out of rivers, up waterfalls. Some say they jump to clean their gills. Others say they jump for joy, because they love the smell of fresh rainwater. Still others say they jump to view their territory. It is certain that the salmon are jumping, but there is no absolute certainty as to why they jump. You could say that this is true of many things. We are certain we are alive, but we are uncertain why. We are certain we are conscious, but we are uncertain why. Almost all “why” questions draw you into a realm of uncertainty, from why salmon jump to why we live and die. This story is partly about a beautiful salmon, and partly about the question of uncertainty. It’s also about the past and how we can’t get back there, except in our minds, and how this means the past is always uncertain. I was living in Oslo at the time, studying philosophy at the university. Among the impressive tutors on the faculty, the best and greatest was an Icelandic philosopher called Alda Jónsdóttir. She was brilliant and also terrifying. She was a professor of logic but her main area was the things that fall out of sets. Superfluities, redundancies, gaps. She often said there were no sensible “why” questions, so we might as well discard them and move on to questions we could actually answer. She had masses of gray curly hair and she spoke and moved very quickly. In winter Oslo, the sidewalks are covered with a patina of treacherous ice. Nonetheless, Alda Jónsdóttir would stride along as if wearing crampons, in no danger of slipping at all, while I’d struggle beside her with little chastened footsteps, trying to stay upright on a surface that was more slippery than an ice rink. One day, when Alda Jónsdóttir was explaining something to me that I really didn’t understand, I slipped and landed with a hard thump on the ice, then slid on my ass downhill. As I struggled up again, Alda Jónsdóttir said to me: “Why did you do that?” Was that a philosophical joke? I wondered. Did philosophers make jokes? It was Alda Jónsdóttir who invited me to dinner. An invitation from a terrifying person must, inevitably perhaps, be terrifying. Also I came from nowhere, I really had no idea about the customs of anywhere else. I was habitually terrified, and Alda Jónsdóttir was an apex of terror in the midst of my quotidian terrorscape. I said yes, anyway, because I was curious, if terrified. I was slightly more curious than terrified. And I wondered various things, like (a) who Alda Jónsdóttir lived with, if anyone; (b) where she lived; (c) what it was like there; and (d) what she would cook for dinner, if she cooked. I couldn’t imagine Alda Jónsdóttir doing anything as ordinary as cooking dinner. There was also the question of why she had invited me. But, as she often said, this was a pointless “why” question. I spent the hours leading up to the dinner in a state of predictable terror. I wasn’t sure what I should wear, so I found my only smart gray suit, which I could wear with the blue shirt my father gave me before he died. It was too big for me but it was the smartest thing I owned. I had a pair of black suede loafers that would be okay with the suit, I thought. Or would they? I had no idea if it was okay to wear black loafers with a gray suit. I had no idea if it was okay to wear black loafers in general. For a few hours, I tried to busy myself with work. I was writing a very overdue essay about “saying the unsayable.” I really didnint know what I was trying to say. Perhaps what I wanted to say was unsayable? Also, I couldn’t concentrate because I kept wondering: Was it okay to wear black loafers with a gray suit? What was okay, anyway? I got dressed in my uncomfortable gray suit, and my too-large blue shirt, and my black loafers. I took along a copy of Snow by Orhan Pamuk as a present. It seemed ridiculous to bring the great Alda Jónsdóttir a book—the temerity!—but I couldn’t think what else to take her, apart from a bottle of wine, which I intended to buy on the way. Then I walked out into the beautiful crisp evening. The air was full of the smell of hops, from the Ringnes brewery. Trams whirred past me but I liked the cold crisp air, so I carried on shuffling along. In Norway, wine is really expensive, and you can buy it only from the government state shop, where it is heavily taxed. That’s quite bad already but on this occasion I’d messed up and the shop was closed by the time I arrived. You literally can’t buy wine anywhere else, only Vinmonopolet, the government shop. I had never really been to a dinner party before, but I knew you were meant to bring a bottle, or else! I was so confounded by this unexpected disaster that I stood outside Vinmonopolet and wept bitterly, as if I were such a raving drunkard that the prospect of an evening without wine was unbearable. People hurried past in their long dark coats and naturally they didn’t offer much sympathy. Actually that’s unfair—one person did pause, and offered the proverbial phrase “Liten tue kan velte stort lass,” which roughly means “The straw that broke the camel’s back.” Then they told me, less sympathetically, to stop blocking the path. It was good advice. I continued. Shuffling along. No wine! A massive epic of disaster! Of course, it was a small social embarrassment really but these things can weigh heavily upon you when you are young and uncertain and have no real idea what the hell you should do amid all this confusion and beauty and madness and terror. And that was just on a cold winter’s night in a beautiful city like Oslo—imagine how it would be, I thought as I kept shuffling along, imagine what would happen if they sent you to fight in a war, you numbskull, what the hell are you even thinking about, weeping like a fool because you can’t buy a stupid bottle of wine! I said those sorts of things to myself, then I fell on the ice and got up again, and finally—still berating myself vividly—I reached the door.`;

document.addEventListener('DOMContentLoaded', () => {
    const wordBank = document.getElementById('word-bank');
    const workspace = document.getElementById('workspace');

    if (!wordBank || !workspace) return;

    // Split text into tokens (keeping punctuation)
    let wordsArray = rawText.split(/(\s+|[.,!?;:—"”“'‘’])/).filter(Boolean);
    
    // Filter out pure whitespace tokens for the bank
    wordsArray = wordsArray.filter(word => !/^\s+$/.test(word));

    // Randomize the order of the tokens (Fisher-Yates)
    for (let i = wordsArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [wordsArray[i], wordsArray[j]] = [wordsArray[j], wordsArray[i]];
    }

    wordsArray.forEach((word) => {
        const span = document.createElement('span');
        span.classList.add('draggable-word');
        span.style.touchAction = 'none';

        // Typographic spacing logic
        const isStickyLeft = /^[.,!?;:”"—]$/.test(word);
        const isApostrophe = /^[’']$/.test(word);
        const isOpeningPunct = /^[“"(]$/.test(word);

        if (isApostrophe || isStickyLeft) {
            span.innerText = word + '\u00A0';
        } else if (isOpeningPunct) {
            span.innerText = word; 
        } else {
            span.innerText = word + '\u00A0';
        }

        span.addEventListener('click', (e) => {
            if (e.altKey || e.metaKey) span.classList.add('erased');
        });

        wordBank.appendChild(span);
    });

    interact('.draggable-word').draggable({
        inertia: false,
        autoScroll: true,
        listeners: {
            start(event) {
                const target = event.target;
                target.style.zIndex = 1000;
                
                // If this is the first move from the bank, make it fixed so it can move anywhere
                if (!target.classList.contains('in-canvas')) {
                    const rect = target.getBoundingClientRect();
                    
                    // Fixed positioning allows floating over constrained containers
                    target.style.position = 'fixed';
                    target.style.top = rect.top + 'px';
                    target.style.left = rect.left + 'px';
                    target.style.margin = '0';
                    
                    target.setAttribute('data-x', 0);
                    target.setAttribute('data-y', 0);
                }
            },
            move(event) {
                const target = event.target;
                const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
                const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;

                target.style.transform = `translate(${x}px, ${y}px)`;
                target.setAttribute('data-x', x);
                target.setAttribute('data-y', y);
            },
            end(event) {
                const target = event.target;
                target.style.zIndex = 500;

                // On the first drop, actually move it to the workspace DOM
                if (target.style.position === 'fixed') {
                    const rect = target.getBoundingClientRect();
                    const workRect = workspace.getBoundingClientRect();

                    // Convert fixed viewport position to a workspace-relative position
                    const finalX = rect.left - workRect.left;
                    const finalY = rect.top - workRect.top;

                    // Relocate inside the workspace DOM
                    target.style.position = 'absolute';
                    target.style.top = '0';
                    target.style.left = '0';
                    target.classList.add('in-canvas');
                    
                    workspace.appendChild(target);

                    // Re-sync coordinates to new container relative position
                    target.setAttribute('data-x', finalX);
                    target.setAttribute('data-y', finalY);
                    target.style.transform = `translate(${finalX}px, ${finalY}px)`;
                }
            }
        }
    });
});