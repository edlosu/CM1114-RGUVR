/*
         Code for the Carousel 
         Functionality is based on toggling display properties of the elements
         containing the video embeded content. The code uses the Youtube API
         to manipulate player objects based on their state.
         Elements for the videos and the navigational arrows are stored through javascript arrays.
         The carousel is implemented partly with the built in setInterval function and cycles 
         through videos and arrays every 5 seconds.
         source:https://developers.google.com/youtube/iframe_api_reference

         Author: Enzo Lopez
        */


        //array for html elements
        var next = document.getElementById('right');
        var prev = document.getElementById('left');
        var playersArr = new Array(3);
        var indicatorsArr = document.querySelectorAll('.indicator');

        //Youtube api player creation
        function onYouTubeIframeAPIReady() {
            //make 3 player objects for 3 videos
            new YT.Player('playerVideo1', {
                videoId: '60yP8f5E-B4',
                events: {
                    'onStateChange': checkPlaying
                }
            });

            new YT.Player('playerVideo2', {
                videoId: '-zyK4TYIUls',
                events: {
                    'onStateChange': checkPlaying
                }
            });

            new YT.Player('playerVideo3', {
                videoId: 'OPvA1gJUAEg',
                events: {
                    'onStateChange': checkPlaying
                }
            });
            //initial value assignment when player is ready
            playersArr[0] = document.getElementById('playerVideo1');
            playersArr[1] = document.getElementById('playerVideo2');
            playersArr[2] = document.getElementById('playerVideo3');
            playersArr[0].style.display='block';
            indicatorsArr[0].classList.add('active');
        
        }   

        
        var interval; 
        var currentIndex=0;
        //Stopping the carousel
        function stopInterval(){
            clearInterval(interval)
        }
        
        /*
            Youtube API Player States
            Ended       0
            Playing     1
            Paused      2
            Buffering   3
            Cued        5
        */
        //When state changed to playing
        function checkPlaying(event){
            //Stop carousel if playing
            if (event.data === 1){
                stopInterval();
                //Reset if clicked on next
                next.addEventListener('click', function(){
                    event.target.cueVideoById(event.target.getVideoData().video_id); 
                    stopInterval()
                    start()
                })
                prev.addEventListener('click', function(){
                    event.target.cueVideoById(event.target.getVideoData().video_id);
                   stopInterval()
                   start()
                })
            }
            if (event.data === 0){
                event.target.stopVideo();
            }
        }

        //Change video to the specified index
        function changeVideo(index){
            for (i=0; i<playersArr.length; i++){
                if (i=== index){
                    playersArr[i].style.display = 'block';
                    indicatorsArr[i].classList.add('active');
                } else{
                    playersArr[i].style.display = 'none'
                    indicatorsArr[i].classList.remove('active')
                }
            }
        }

        //Switch video every 5 seconds - carousel
        function start(){
            interval = setInterval( function(){
                var nextIndex = (currentIndex + 1) % playersArr.length;
                changeVideo(nextIndex);
                currentIndex = nextIndex;
            },5000)
        }

        //Next video in the order
        function nextVideo(){
            var nextIndex = (currentIndex + 1) % playersArr.length;
            changeVideo(nextIndex);
            currentIndex = nextIndex;
         
        }
        //Previous video in the order
        function prevVideo(){
            var prevIndex = (currentIndex - 1 + playersArr.length) % playersArr.length;
            changeVideo(prevIndex);
            currentIndex = prevIndex;
        }

        //Assign event listeners for arrow divs to switch videos 
        next.addEventListener('click', nextVideo);
        prev.addEventListener('click', prevVideo);
        
        start()