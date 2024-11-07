import React from 'react'
import { Box, Flex, Input} from '@chakra-ui/react'
import { Search } from 'lucide-react'
const ChatPage = () => {
  return (
    <Box
			position={"absolute"}
			left={"50%"}
			w={{ base: "100%", md: "80%", lg: "750px" }}
			p={4}
			transform={"translateX(-50%)"}
		>
			<Flex
				gap={4}
				flexDirection={{ base: "column", md: "row" }}
				maxW={{
					sm: "400px",
					md: "full",
				}}
				mx={"auto"}
			>
                <Flex flex={30}>
                <Text fontWeight={700} className="bg-secondary">
						Your Conversations
					</Text>
                    <form>
                        <Flex>
                            <Input placeholder='Search for a user'/>
                            <Button size={"sm"}> 
                                <Search/>
                            </Button> 
                        </Flex>
                    </form>
                </Flex>
                <Flex flex={70}>MessageContainer</Flex>
			</Flex>
            </Box>
  )
}

export default ChatPage