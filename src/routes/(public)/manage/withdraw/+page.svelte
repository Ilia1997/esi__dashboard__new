<script>
	import { scrollToTop } from '$lib/functions/scrollToTop.js';
	import { roundNumber } from '$lib/functions/roundNumber.js';
	import WithdrawFooter from './withdraw-footer/WithdrawFooter.svelte';
	import WithdrawManager from './withdraw-manager/WithdrawManager.svelte';
	import WithdrawPlans from './withdraw-plans/WithdrawPlans.svelte';
	import ConfirmModal from './withdraw-confirm/ConfirmModal.svelte';
	import { globalData } from '$lib/globalStore';
	import { withdrawBalance } from './withdrawStore';
	let timeToTransfer, withdrawOfTotal, selectedPaymentMethod;
	const fee = $globalData.data.feeInfo.fee / 100;
	const timeToTransferLessThan20 = $globalData.data.feeInfo.lessThen20;
	const timeToTransferMoreThan20 = $globalData.data.feeInfo.moreThen20;
	let balance = $globalData.data.currentSubscription.balance;

	$: {
		withdrawOfTotal = roundNumber(($withdrawBalance * 100) / balance, 2);
		if (withdrawOfTotal > 100) {
			withdrawOfTotal = 100;
		} else if (withdrawOfTotal <= 20) {
			timeToTransfer = timeToTransferLessThan20;
		} else if (withdrawOfTotal > 20) {
			timeToTransfer = timeToTransferMoreThan20;
		}
	}
	scrollToTop();
</script>

<svelte:head>
	<title>Withdraw</title>
	<meta name="description" content="Withdraw page" />
</svelte:head>
<WithdrawManager />
<WithdrawPlans
	current_contribution={$globalData.data.current_contribution}
	currentSymbol={$globalData.data.currency.symbol}
/>
<WithdrawFooter {fee} {timeToTransfer} {withdrawOfTotal}  />

<!-- Verify account -->
<ConfirmModal
	withdrawMethods={$globalData.data.withdrawal_payment_methods}
	{fee}
	{timeToTransfer}
	{withdrawOfTotal}

	{selectedPaymentMethod}
/>
