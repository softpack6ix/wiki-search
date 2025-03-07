import { Command } from 'cmdk'
import { useState, useRef, useEffect } from 'react';

export const CommandMenu = () => {
    const [posts, setPosts] = useState([]);
    const inputRef = useRef(null)
    const listRef = useRef(null)
    // console.log(posts)

    const [open, setOpen] = useState(false)

    useEffect(() => {
        const down = (e) => {
            if (e.key === "j" && (e.metaKey || e.ctrlKey)) {
                e.preventDefault()
                openAndFetch()
            }

            if (e.key == "Escape") {
                e.preventDefault()
                setOpen(() => false)
                document.body.classList.remove('search-open')
            }
        }

        document.addEventListener("keydown", down)
        return () => document.removeEventListener("keydown", down)
    })


    function openAndFetch() {
        setOpen((open) => !open)
        document.body.classList.toggle('search-open')

        if (posts.length == 0) {
            fetch('https://wiki.klokpacksix.nl/wp-json/kp6/search')
                .then(res => res.json())
                .then(p => setPosts(p.results))
            console.log("EFFECT")
        }
        // console.log(inputRef.)
        setTimeout(() => {
            inputRef.current.focus()
        }, 10)
    }


    return (
        <div className='raycast'>
            <svg className="search" onClick={() => openAndFetch()} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f6f6f6" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg>
            {/* <svg className="search" onClick={() => openAndFetch()} xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#f6f6f6" viewBox="0 0 256 256"><path d="M232.49,215.51,185,168a92.12,92.12,0,1,0-17,17l47.53,47.54a12,12,0,0,0,17-17ZM44,112a68,68,0,1,1,68,68A68.07,68.07,0,0,1,44,112Z"></path></svg> */}

            {/* <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M229.66,218.34l-50.07-50.06a88.11,88.11,0,1,0-11.31,11.31l50.06,50.07a8,8,0,0,0,11.32-11.32ZM40,112a72,72,0,1,1,72,72A72.08,72.08,0,0,1,40,112Z"></path></svg> */}
            <div className='overlay'>
                <div className='close-area' onClick={() => {
                    // if (e.)
                    console.log('close clicked')
                    setOpen((open) => !open)
                    document.body.classList.toggle('search-open')
                }}></div>

                <Command label="Search" open={open} onOpenChange={setOpen}>
                    <div cmdk-raycast-top-shine="" />
                    <Command.Input ref={inputRef} autoFocus="true" placeholder="Search for events, members, albums and more" />
                    <hr cmdk-raycast-loader="" />

                    <Command.List ref={listRef}>
                        <Command.Empty>{posts.length > 0 ? 'No results found.' : 'Loading...'}</Command.Empty>
                        <Command.Group heading={posts.length > 0 ? 'Results' : ''}>
                            {posts.map(p =>
                                <Command.Item
                                    value={p.members.join(', ') + p.post_title}
                                    key={p.permalink}
                                    keywords={['issue', 'sprint']}
                                    onSelect={() => {
                                        // window.location.assign(p.permalink)
                                        // location.assign('https://google.com')
                                        location.assign(p.permalink)
                                        console.log(p.permalink)
                                    }}>


                                    {p.members.length > 0 && <strong>{p.members.join(', ')}</strong>}

                                    {p.post_type == 'member'
                                        ? <strong> {p.post_title} </strong>
                                        : <span> {p.post_title} </span>
                                    }



                                    <span cmdk-raycast-meta="">
                                        {p.post_type.replace('-', ' ')}
                                    </span>


                                    {p.post_type == 'event' &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#040404" viewBox="0 0 256 256"><path d="M208,32H184V24a8,8,0,0,0-16,0v8H88V24a8,8,0,0,0-16,0v8H48A16,16,0,0,0,32,48V208a16,16,0,0,0,16,16H208a16,16,0,0,0,16-16V48A16,16,0,0,0,208,32ZM72,48v8a8,8,0,0,0,16,0V48h80v8a8,8,0,0,0,16,0V48h24V80H48V48ZM208,208H48V96H208V208Z"></path></svg>
                                    }

                                    {p.post_type == 'album' &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#040404" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216Zm0-144a56.06,56.06,0,0,0-56,56,8,8,0,0,1-16,0,72.08,72.08,0,0,1,72-72,8,8,0,0,1,0,16Zm72,56a72.08,72.08,0,0,1-72,72,8,8,0,0,1,0-16,56.06,56.06,0,0,0,56-56,8,8,0,0,1,16,0Zm-40,0a32,32,0,1,0-32,32A32,32,0,0,0,160,128Zm-48,0a16,16,0,1,1,16,16A16,16,0,0,1,112,128Z"></path></svg>
                                    }

                                    {p.post_type == 'dj-set' &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#000000" viewBox="0 0 256 256"><path d="M80,96a8,8,0,0,1-8,8H24a8,8,0,0,1,0-16H72A8,8,0,0,1,80,96Zm-8,24H24a8,8,0,0,0,0,16H72a8,8,0,0,0,0-16Zm0,32H24a8,8,0,0,0,0,16H72a8,8,0,0,0,0-16Zm0,32H24a8,8,0,0,0,0,16H72a8,8,0,0,0,0-16Zm80-64H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm0,32H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm0,32H104a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm80-96H184a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16ZM184,72h48a8,8,0,0,0,0-16H184a8,8,0,0,0,0,16Zm48,48H184a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm0,32H184a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Zm0,32H184a8,8,0,0,0,0,16h48a8,8,0,0,0,0-16Z"></path></svg>
                                    }

                                    {p.post_type == 'member' &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#040404" viewBox="0 0 256 256"><path d="M128,24A104,104,0,1,0,232,128,104.11,104.11,0,0,0,128,24Zm0,192a88,88,0,1,1,88-88A88.1,88.1,0,0,1,128,216ZM80,108a12,12,0,1,1,12,12A12,12,0,0,1,80,108Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,176,108Zm-1.07,48c-10.29,17.79-27.4,28-46.93,28s-36.63-10.2-46.92-28a8,8,0,1,1,13.84-8c7.47,12.91,19.21,20,33.08,20s25.61-7.1,33.07-20a8,8,0,0,1,13.86,8Z"></path></svg>
                                    }

                                    {p.post_type == 'project' &&
                                        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="#040404" viewBox="0 0 256 256"><path d="M239.18,97.26A16.38,16.38,0,0,0,224.92,86l-59-4.76L143.14,26.15a16.36,16.36,0,0,0-30.27,0L90.11,81.23,31.08,86a16.46,16.46,0,0,0-9.37,28.86l45,38.83L53,211.75a16.38,16.38,0,0,0,24.5,17.82L128,198.49l50.53,31.08A16.4,16.4,0,0,0,203,211.75l-13.76-58.07,45-38.83A16.43,16.43,0,0,0,239.18,97.26Zm-15.34,5.47-48.7,42a8,8,0,0,0-2.56,7.91l14.88,62.8a.37.37,0,0,1-.17.48c-.18.14-.23.11-.38,0l-54.72-33.65a8,8,0,0,0-8.38,0L69.09,215.94c-.15.09-.19.12-.38,0a.37.37,0,0,1-.17-.48l14.88-62.8a8,8,0,0,0-2.56-7.91l-48.7-42c-.12-.1-.23-.19-.13-.5s.18-.27.33-.29l63.92-5.16A8,8,0,0,0,103,91.86l24.62-59.61c.08-.17.11-.25.35-.25s.27.08.35.25L153,91.86a8,8,0,0,0,6.75,4.92l63.92,5.16c.15,0,.24,0,.33.29S224,102.63,223.84,102.73Z"></path></svg>
                                    }

                                </Command.Item>
                            )}
                        </Command.Group>
                    </Command.List>

                    <div cmdk-raycast-footer="">
                        <svg></svg>

                        <button cmdk-raycast-open-trigger="">
                            Go to page
                            <kbd>↵</kbd>
                        </button>
                    </div>
                </Command>
            </div>


        </div>
    )
}