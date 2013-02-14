<?php include_once('inc/header.php') ?>

	<div class="search">
		<ul class="nav nav-search">
			<li><a href="#" class="is-active">Destinations</a></li>
			<li><a href="#">Platforms</a></li>
		</ul>
		<form id="search-form" class="search-form">
			<span class="input-container">
				<label for="search-field">Search:</label>
				<input type="search" id="search-field" placeholder="eg. Gatwick Airport">
			</span>
		</form>
	</div>

	<?php include_once('inc/nav-alphabetical.php') ?>

	<div id="result-container" class="result-container">
		<ul id="destinations" class="destinations">
			<?php // populated with destinations list ?>
		</ul>




		<ul class="destinations">
			<li>
				<a href="#">Addlestone</a>
				<div class="entry-content is-hidden">
					<ul class="platforms">
						<li>Platform 5</li>
						<li>Platform 6</li>
						<li>Platform 11</li>
					</ul>
				</div>
			</li>
		</ul>
	</div>

<?php include_once('inc/footer.php') ?>
