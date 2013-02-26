		<footer class="app-footer">
			<p><a href="https://twitter.com/share" class="twitter-share-button">Tweet</a></p>
			<script>
				!function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0];
					if(!d.getElementById(id)){
						js=d.createElement(s);
						js.id=id;
						js.src="//platform.twitter.com/widgets.js";
						fjs.parentNode.insertBefore(js,fjs);
					}
				}(document,"script","twitter-wjs");
			</script>
			<p class="footnote">&copy; <?php echo date('Y') ?> <a href="http://www.guyroutledge.co.uk">Guy Routledge</a></p>
		</footer>


		<?php // Scripts at the bottom for performance ?>
		<script src="//ajax.googleapis.com/ajax/libs/jquery/1.8/jquery.min.js"></script>
		<script src="js/libs/jquery.autocomplete.js"></script>
		<script src="js/app.js"></script>

		<script type="text/javascript">
			var _gaq = _gaq || [];
			_gaq.push(['_setAccount', 'UA-38800299-1']);
			_gaq.push(['_trackPageview']);
			(function() {
				var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
				ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
				var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
			})();
		</script>
	</body>
</html>
