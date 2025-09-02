/*
	Big Picture by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

function decodeEmail(encoded) {
    var email = "";
    // La boucle commence au dernier caractère et se termine au premier (index 0)
    for (var i = encoded.length - 1; i >= 0; i--) {
        // Décode le caractère
        email += String.fromCharCode(encoded.charCodeAt(i) - 3);
    }
    return email;
};

// Exemple d'utilisation
// encodeURIComponent('contact@monsite.com').split('').reverse().join('');
// Ce code génère le hash à utiliser : moc.etisnom@tcatnoc
document.getElementById('email-link').innerHTML = decodeEmail('prf1oldpjCrus1huxdihrq');
document.getElementById('email-link').href = 'mailto:' + decodeEmail('prf1oldpjCrus1huxdihrq');

(function($) {

	var	$window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$all = $body.add($header);

	// Breakpoints.
		breakpoints({
			xxlarge: [ '1681px',  '1920px' ],
			xlarge:  [ '1281px',  '1680px' ],
			large:   [ '1001px',  '1280px' ],
			medium:  [ '737px',   '1000px' ],
			small:   [ '481px',   '736px'  ],
			xsmall:  [ null,      '480px'  ]
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			setTimeout(function() {
				$body.removeClass('is-preload');
			}, 80);
		});

	// Touch mode.
		if (browser.mobile)
			$body.addClass('is-touch');
		else {

			breakpoints.on('<=small', function() {
				$body.addClass('is-touch');
			});

			breakpoints.on('>small', function() {
				$body.removeClass('is-touch');
			});

		}

	// Fix: IE flexbox fix.
		if (browser.name == 'ie') {

			var $main = $('.main.fullscreen'),
				IEResizeTimeout;

			$window
				.on('resize.ie-flexbox-fix', function() {

					clearTimeout(IEResizeTimeout);

					IEResizeTimeout = setTimeout(function() {

						var wh = $window.height();

						$main.each(function() {

							var $this = $(this);

							$this.css('height', '');

							if ($this.height() <= wh)
								$this.css('height', (wh - 50) + 'px');

						});

					});

				})
				.triggerHandler('resize.ie-flexbox-fix');

		}

	// Gallery.
		/*$window.on('load', function() {

			var $gallery = $('.gallery');

			$gallery.poptrox({
				baseZIndex: 10001,
				// Use your custom popup.
   				//popupSelector: '#custom-popup',
				useBodyOverflow: false,
				usePopupEasyClose: false,
				overlayColor: '#1f2328',
				overlayOpacity: 0.65,
				usePopupDefaultStyling: false,
				usePopupCaption: true,
				popupLoaderText: '',
				windowMargin: 50,
				usePopupNav: true
			});

			// Hack: Adjust margins when 'small' activates.
				breakpoints.on('>small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 50;
					});
				});

				breakpoints.on('<=small', function() {
					$gallery.each(function() {
						$(this)[0]._poptrox.windowMargin = 5;
					});
				});



		});*/

	// Section transitions.
		if (browser.canUse('transition')) {

			var on = function() {

				// Galleries.
					$('.gallery')
						.scrollex({
							top:		'30vh',
							bottom:		'30vh',
							delay:		20,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Generic sections.
					$('.main.style1')
						.scrollex({
							mode:		'middle',
							delay:		40,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

					$('.main.style2')
						.scrollex({
							mode:		'middle',
							delay:		40,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

				// Contact.
					$('#contact')
						.scrollex({
							top:		'50%',
							delay:		40,
							initialize:	function() { $(this).addClass('inactive'); },
							terminate:	function() { $(this).removeClass('inactive'); },
							enter:		function() { $(this).removeClass('inactive'); },
							leave:		function() { $(this).addClass('inactive'); }
						});

			};

			var off = function() {

				// Galleries.
					$('.gallery')
						.unscrollex();

				// Generic sections.
					$('.main.style1')
						.unscrollex();

					$('.main.style2')
						.unscrollex();

				// Contact.
					$('#contact')
						.unscrollex();

			};

			breakpoints.on('<=small', off);
			breakpoints.on('>small', on);

		}

	// Events.
		var resizeTimeout, resizeScrollTimeout;

		$window
			.on('resize', function() {

				// Disable animations/transitions.
					$body.addClass('is-resizing');

				clearTimeout(resizeTimeout);

				resizeTimeout = setTimeout(function() {

					// Update scrolly links.
						$('a[href^="#"]').scrolly({
							speed: 1000,
							offset: $header.outerHeight() - 1
						});

					// Re-enable animations/transitions.
						setTimeout(function() {
							$body.removeClass('is-resizing');
							$window.trigger('scroll');
						}, 0);

				}, 100);

			})
			.on('load', function() {
				$window.trigger('resize');
			});


/* AJOUT */
			// Variable pour garder une référence à l'audio actuellement en lecture
			var currentAudio = null;

			$('.audio-play-button').on('click', function(e) {
			    e.preventDefault();
			    e.stopPropagation();

			    // Trouvez les éléments de l'article cliqué
			    var $article = $(this).closest('article');
			    var audioElement = $article.find('audio')[0];
			    var $infoTextTopElement = $article.find('.audio-info-text-top');
			    var $infoTextBottomElement = $article.find('.audio-info-text-bottom');
			    var $imageOverlay = $article.find('.image-overlay'); // Nouvelle référence

			    // Mettre en pause le précédent audio et masquer son texte et son overlay
			    if (currentAudio && currentAudio !== audioElement) {
			        $(currentAudio).closest('article').find('.audio-play-button .icon').removeClass('fa-pause').addClass('fa-play');
			        $(currentAudio).closest('article').find('.audio-info-text-top, .audio-info-text-bottom, .image-overlay').removeClass('is-playing'); // Masque aussi l'overlay précédent
			        currentAudio.pause();
			        currentAudio.currentTime = 0;
			    }

			    if (audioElement.paused) {
			        // Démarre la lecture
			        audioElement.play();
			        $(this).find('.icon').removeClass('fa-play').addClass('fa-pause');
			        
			        // --- CONTRÔLE MANUEL DU TITRE ---
			        var isMultiline = $(this).data('multiline');
			        if (isMultiline) {
			            $infoTextTopElement.addClass('multi-line');
			        }

			        // Affiche le titre, le texte et l'overlay
			        $infoTextTopElement.addClass('is-playing');
			        $infoTextBottomElement.addClass('is-playing');
			        $imageOverlay.addClass('is-playing'); // Rend l'overlay visible
			        
			    } else {
			        // Met en pause la lecture
			        audioElement.pause();
			        $(this).find('.icon').removeClass('fa-pause').addClass('fa-play');
			        
			        // Cache le titre, le texte et l'overlay
			        $infoTextTopElement.removeClass('is-playing');
			        $infoTextBottomElement.removeClass('is-playing');
			        $imageOverlay.removeClass('is-playing'); // Cache l'overlay
			        // Attend que l'effet de fondu se produise avant de retirer la classe de positionnement
			        setTimeout(function() {
			            $infoTextTopElement.removeClass('multi-line');
			        }, 300); // Le délai (en millisecondes) correspond à la durée de la transition CSS (0.3s)
			    }

			    currentAudio = audioElement;
			});

			// Gère l'icône, le texte et l'overlay lorsque l'audio se termine
			$('audio').on('ended', function() {
			    var $article = $(this).closest('article');
			    $article.find('.audio-play-button .icon').removeClass('fa-pause').addClass('fa-play');
			    $article.find('.audio-info-text-top, .audio-info-text-bottom, .image-overlay').removeClass('is-playing'); // Masque l'overlay
			    setTimeout(function() {
			            $infoTextTopElement.removeClass('multi-line');
			        }, 300); // Le délai (en millisecondes) correspond à la durée de la transition CSS (0.3s)
			    currentAudio = null;
			});

})(jQuery);