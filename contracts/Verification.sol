// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Verification {
    /**
    * @dev Recover signer address from a message by using their signature
    * @param hash bytes32 message, the hash is the signed message. What is recovered is the signer address.
    * @param signature bytes signature, the signature is generated using web3.eth.sign()
    */
    function recover(bytes32 hash, bytes signature) public pure returns (address) {
        bytes32 r;
        bytes32 s;
        uint8 v;

        // check the signature length
        if (signature.length != 65) {
            return (address(0));
        }

        // Divide the signature in r, s, and v variables
        // ecrecover takes the signature params, and the only way to get them
        // currently is to use assembly
        // solium-disable-next-line security/no-inline-assembly
        assembly {
            // first 32 bytes (0x20)
            r := mload(add(signature, 0x20))
            // second 64 bytes (0x40)
            s := mload(add(signature, 0x40))
            // final 96 bytes (0x60)
            v := byte(0, mload(add(signature, 0x60)))
        }

        if (v < 27) {
            v += 27;
        }

        if (v != 27 && v != 28) {
            return (address(0));
        } else {
            // solium-disable-next-line arg-overflow
            return ecrecover(hash, v, r, s);
        }
    }

    function getEthSignedMessageHash(bytes32 _messageHash) public pure returns(bytes32) {
        /*
        * Signature is produced by signing a keccak256 hash with the following format:
        * "\x19Ethereum Signed Message\n" + len(msg) + msg
        */
        return keccak256(abi.encodePacked("\x19Ethereum Signed Message:\n32", _messageHash));
    }
}