<div class="app">
	<slot></slot>
</div>


<style>
	:global(.app){
		height: 100vh;
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}
	:global(:html){
		margin: 0;
		padding: 0;
	}
	:global(body){
		margin: 0;
		padding: 0;
	}
</style>
