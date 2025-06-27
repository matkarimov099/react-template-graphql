import { Toaster } from '@/components/ui/sonner.tsx';
import { Spinner } from '@/components/ui/spinner.tsx';
import { useMediaQuery } from '@/hooks/use-media-query.ts';
import { router } from '@/router';
import { ApolloProvider } from '@apollo/client';
import { apolloClient } from '@/plugins/apollo-client';
import { useEffect, useState } from 'react';
import { RouterProvider } from 'react-router';

function App() {
	const [loading, setLoading] = useState<boolean>(true);
	const isMobile = useMediaQuery('(max-width: 767px)');
	useEffect(() => {
		setTimeout(() => setLoading(false), 500);
	}, []);
	return loading ? (
		<Spinner
			size="large"
			className="flex h-screen items-center justify-center"
		/>
	) : (
		<>
			<ApolloProvider client={apolloClient}>
				<Toaster
					richColors
					expand
					visibleToasts={8}
					closeButton
					position={isMobile ? 'top-center' : 'bottom-right'}
				/>
				<RouterProvider router={router} />
			</ApolloProvider>
		</>
	);
}

export { App };
